"""
BuildOS — Synthetic Dataset Generator for Contract Parsing
Generates training data for Llama 4 fine-tuning.
"""
import json
import random
from typing import Any

CONTRACT_TEMPLATES = [
    {"type": "lump_sum", "name": "Lump Sum Contract"},
    {"type": "cost_plus", "name": "Cost Plus Contract"},
    {"type": "design_build", "name": "Design-Build Contract"},
    {"type": "unit_price", "name": "Unit Price Contract"},
    {"type": "turnkey", "name": "Turnkey Contract"},
]

def generate_contract(seed: int) -> dict[str, Any]:
    random.seed(seed)
    template = random.choice(CONTRACT_TEMPLATES)
    value = round(random.uniform(500_000, 50_000_000), 2)

    contract = {
        "type": template["name"],
        "value": value,
        "currency": "USD",
        "duration_days": random.randint(90, 1095),
        "owner": f"Owner Corp {random.randint(1, 100)}",
        "contractor": f"Contractor Ltd {random.randint(1, 100)}",
        "liquidated_damages_per_day": round(value * random.uniform(0.001, 0.01), 2),
        "retention_percentage": random.choice([5.0, 10.0, 0.0]),
        "governing_law": random.choice(["New York", "England & Wales", "France", "Singapore"]),
        "has_force_majeure": random.random() > 0.1,
        "has_arbitration": random.random() > 0.2,
        "milestones": random.randint(3, 12),
    }
    return contract

def format_as_document(contract: dict) -> str:
    lines = [f"CONTRACT #C-{random.randint(1000, 9999)}"]
    lines.append(f"TYPE: {contract['type']}")
    lines.append(f"BETWEEN: {contract['owner']} AND {contract['contractor']}")
    lines.append(f"VALUE: ${contract['value']:,.2f} {contract['currency']}")
    lines.append(f"DURATION: {contract['duration_days']} days")
    lines.append(f"LAW: {contract['governing_law']}")
    lines.append(f"LD: ${contract['liquidated_damages_per_day']:,.2f}/day (cap: 10%)")
    lines.append(f"RETENTION: {contract['retention_percentage']}%")
    lines.append(f"SCOPE: Construction of {'residential' if random.random() > 0.5 else 'commercial'} building")
    lines.append(f"MILESTONES: {contract['milestones']} milestones")
    return "\n".join(lines)

def generate_dataset(num_examples: int, output_path: str):
    data = []
    for i in range(num_examples):
        contract = generate_contract(i)
        doc_text = format_as_document(contract)
        output_json = json.dumps(contract, indent=2)
        data.append({
            "instruction": "Extract structured data from this construction contract in JSON format.",
            "input": doc_text,
            "output": output_json,
        })

    with open(output_path, "w") as f:
        for item in data:
            f.write(json.dumps(item) + "\n")

    print(f"Generated {num_examples} examples → {output_path}")

def augment_dataset(input_path: str, output_path: str, factor: int = 5):
    """Augment with variations: language, noise, missing fields."""
    with open(input_path) as f:
        data = [json.loads(line) for line in f]

    augmented = []
    for item in data:
        for _ in range(factor):
            aug = item.copy()
            # Add OCR noise
            if random.random() > 0.7:
                aug["input"] = aug["input"].replace(" ", " ")  # double space
            # Missing fields
            if random.random() > 0.8:
                parsed = json.loads(aug["output"])
                parsed.pop(random.choice(list(parsed.keys())), None)
                aug["output"] = json.dumps(parsed)
            augmented.append(aug)

    with open(output_path, "w") as f:
        for item in augmented:
            f.write(json.dumps(item) + "\n")
    print(f"Augmented {len(data)} → {len(augmented)} examples")

if __name__ == "__main__":
    generate_dataset(5000, "data/contracts_dataset.jsonl")
    augment_dataset("data/contracts_dataset.jsonl", "data/contracts_augmented.jsonl")
