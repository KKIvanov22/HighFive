from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch
import os

model_name = "EleutherAI/gpt-neo-2.7B"
quant_config = BitsAndBytesConfig(load_in_4bit=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

checkpoint_path = os.path.abspath("models/material_to_effect/results/checkpoint-3800")
print(f"Loading model from: {checkpoint_path}")

if not os.path.exists(checkpoint_path):
    print(f"ERROR: Directory {checkpoint_path} does not exist!")
    exit(1)

model = AutoModelForCausalLM.from_pretrained(
    checkpoint_path,  
    local_files_only=True,  
    quantization_config=quant_config,
    torch_dtype=torch.float16,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained(model_name)

input_text = "Brand: Nike, Material: Cotton =>"
input_ids = tokenizer.encode(input_text, return_tensors="pt").to(device)

with torch.no_grad():
    output_ids = model.generate(
        input_ids=input_ids,
        max_length=50,
        do_sample=True,
        top_k=50,
        top_p=0.95
    )

result = tokenizer.decode(output_ids[0], skip_special_tokens=True)
print(result)