"""
BuildOS — Model Serving with vLLM
Run: python serve.py --model ./outputs/final
"""
import argparse
import logging
from typing import Optional

from vllm import AsyncLLMEngine, AsyncEngineArgs, SamplingParams

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are BuildOS Document Agent, an expert at extracting structured data from construction contracts. Always output valid JSON."""

def create_engine(model_path: str, tensor_parallel_size: int = 2):
    args = AsyncEngineArgs(
        model=model_path,
        tensor_parallel_size=tensor_parallel_size,
        gpu_memory_utilization=0.9,
        max_model_len=8192,
        dtype="bfloat16",
        quantization="awq",
        enforce_eager=True,
    )
    return AsyncLLMEngine.from_engine_args(args)

def build_prompt(instruction: str, input_text: str) -> str:
    return f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
{SYSTEM_PROMPT}<|eot_id|>
<|start_header_id|>user<|end_header_id|>
{instruction}

{input_text}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
"""

async def extract(
    engine: AsyncLLMEngine,
    input_text: str,
    max_tokens: int = 1024,
    temperature: float = 0.1,
) -> str:
    prompt = build_prompt(SYSTEM_PROMPT, input_text)
    params = SamplingParams(
        temperature=temperature,
        max_tokens=max_tokens,
        stop=["<|eot_id|>"],
    )

    request_id = "req_" + str(hash(input_text))
    outputs = []
    async for result in engine.generate(prompt, params, request_id):
        outputs.append(result.outputs[0].text)
    return "".join(outputs)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str, required=True)
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--tensor-parallel-size", type=int, default=2)
    args = parser.parse_args()

    logger.info(f"Loading model from {args.model}...")
    engine = create_engine(args.model, args.tensor_parallel_size)
    logger.info(f"Server ready on port {args.port}")

    import uvicorn
    from fastapi import FastAPI

    app = FastAPI(title="BuildOS Document Agent")

    @app.post("/extract")
    async def extract_endpoint(text: str):
        result = await extract(engine, text)
        return {"result": result}

    uvicorn.run(app, host="0.0.0.0", port=args.port)

if __name__ == "__main__":
    main()
