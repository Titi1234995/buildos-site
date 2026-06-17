"""
BuildOS — Llama 4 Fine-Tuning for Contract Parsing
Run: accelerate launch train.py --config config.yml
"""
import json
import logging
import yaml
from dataclasses import dataclass
from typing import Optional

import torch
from datasets import Dataset, load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    HfArgumentParser,
    TrainingArguments,
)
from trl import SFTTrainer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Config:
    model_name: str = "meta-llama/Llama-4-70b-chat-hf"
    dataset_path: str = "./data/contracts_dataset.jsonl"
    output_dir: str = "./outputs"
    lora_r: int = 64
    lora_alpha: int = 128
    lora_dropout: float = 0.1
    max_seq_length: int = 4096
    batch_size: int = 4
    learning_rate: float = 2e-4
    num_epochs: int = 3
    hf_token: Optional[str] = None

def load_config(path: str = "config.yml") -> Config:
    with open(path) as f:
        return Config(**yaml.safe_load(f)["training"])

def format_instruction(example: dict) -> str:
    return f"""### Instruction:
Extract structured construction contract data in JSON format.

### Input:
{example['input']}

### Output:
{example['output']}
"""

def main():
    cfg = load_config()

    # Quantization config
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16,
        bnb_4bit_use_double_quant=True,
    )

    # Load model
    logger.info(f"Loading {cfg.model_name}...")
    model = AutoModelForCausalLM.from_pretrained(
        cfg.model_name,
        quantization_config=bnb_config,
        device_map="auto",
        torch_dtype=torch.bfloat16,
        token=cfg.hf_token,
    )
    model = prepare_model_for_kbit_training(model)

    # LoRA config
    peft_config = LoraConfig(
        r=cfg.lora_r,
        lora_alpha=cfg.lora_alpha,
        lora_dropout=cfg.lora_dropout,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=["q_proj", "v_proj", "k_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    )
    model = get_peft_model(model, peft_config)

    # Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(cfg.model_name, token=cfg.hf_token)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # Load dataset
    logger.info(f"Loading dataset from {cfg.dataset_path}...")
    dataset = load_dataset("json", data_files=cfg.dataset_path, split="train")
    dataset = dataset.train_test_split(test_size=0.05)

    def tokenize(examples):
        texts = [format_instruction(e) for e in examples]
        return tokenizer(texts, truncation=True, max_length=cfg.max_seq_length, padding=False)

    train_dataset = dataset["train"].map(tokenize, batched=True, remove_columns=dataset["train"].column_names)
    eval_dataset = dataset["test"].map(tokenize, batched=True, remove_columns=dataset["test"].column_names)

    # Training args
    training_args = TrainingArguments(
        output_dir=cfg.output_dir,
        num_train_epochs=cfg.num_epochs,
        per_device_train_batch_size=cfg.batch_size,
        gradient_accumulation_steps=8,
        learning_rate=cfg.learning_rate,
        logging_steps=25,
        save_steps=500,
        eval_steps=500,
        save_total_limit=3,
        bf16=True,
        optim="adamw_8bit",
        lr_scheduler_type="cosine",
        warmup_steps=100,
        report_to=["wandb"],
        run_name="buildos-llama4-v1",
    )

    # Trainer
    trainer = SFTTrainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        tokenizer=tokenizer,
        max_seq_length=cfg.max_seq_length,
        dataset_text_field="text",
    )

    logger.info("Starting training...")
    trainer.train()
    trainer.save_model(f"{cfg.output_dir}/final")
    tokenizer.save_pretrained(f"{cfg.output_dir}/final")
    logger.info(f"Training complete. Model saved to {cfg.output_dir}/final")

if __name__ == "__main__":
    main()
