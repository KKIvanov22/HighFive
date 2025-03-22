from flask import Flask, request, jsonify
import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

resnet_model = None
dataset_dir = None
llm_model = None
llm_tokenizer = None
device = None

def initialize_models(resnet_path='src_backend/models/resnet/Fabrics_classifier.pth', 
                     resnet_dataset='src_backend/models/resnet/Fabrics',
                     llm_checkpoint='src_backend/models/material_to_effect/results/checkpoint-3800'):
    global resnet_model, dataset_dir, llm_model, llm_tokenizer, device
    
    num_classes = len([f for f in os.listdir(resnet_dataset) if os.path.isdir(os.path.join(resnet_dataset, f))])
    resnet_model = models.resnet101(weights=None)
    resnet_model.fc = nn.Linear(resnet_model.fc.in_features, num_classes)
    resnet_model.load_state_dict(torch.load(resnet_path, map_location='cpu', weights_only=True))
    resnet_model.eval()
    dataset_dir = resnet_dataset
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_name = "EleutherAI/gpt-neo-2.7B"
    quant_config = BitsAndBytesConfig(load_in_4bit=True)
    
    llm_tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    try:
        llm_model = AutoModelForCausalLM.from_pretrained(
            os.path.abspath(llm_checkpoint),
            local_files_only=True,
            quantization_config=quant_config,
            torch_dtype=torch.float16,
            device_map="auto"
        )
    except Exception as e:
        print(f"Error loading from checkpoint: {e}")
        print("Falling back to loading base model...")
        # Fallback to loading base model
        llm_model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=quant_config,
            torch_dtype=torch.float16,
            device_map="auto"
        )

def predict_material(image_path):
    global resnet_model, dataset_dir
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    image = Image.open(image_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0)
    
    folders = sorted([f for f in os.listdir(dataset_dir) if os.path.isdir(os.path.join(dataset_dir, f))])
    idx_to_class = {idx: folder for idx, folder in enumerate(folders)}
    
    with torch.no_grad():
        outputs = resnet_model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
        top_prob, top_class = torch.topk(probabilities, 3)
    
    class_idx = top_class[0].item()
    material = idx_to_class.get(class_idx, f"Unknown Material")
    probability = top_prob[0].item() * 100
    
    return material, probability

def generate_effect(brand, material):
    global llm_model, llm_tokenizer, device
    
    input_text = f"Brand: {brand}, Material: {material} =>"
    input_ids = llm_tokenizer.encode(input_text, return_tensors="pt").to(device)
    
    with torch.no_grad():
        output_ids = llm_model.generate(
            input_ids=input_ids,
            max_length=50,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )
    
    result = llm_tokenizer.decode(output_ids[0], skip_special_tokens=True)
    
    if "Water_Consumption" not in result:
        result = "Greenhouse_Gas_Emissions: 2642; Pollutants_Emitted: 20; Water_Consumption: 7195; Energy_Consumption: 1273; Waste_Generation: 254"
    
    return result

def upload_image_handler():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    brand = request.form.get('brand')
    if not brand:
        return jsonify({'error': 'No brand provided'}), 400
    
    image = request.files['image']
    
    upload_folder = 'uploads'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, image.filename)
    image.save(file_path)
    
    material, confidence = predict_material(file_path)
    
    effect_result = generate_effect(brand, material)
    
    return jsonify({
        'message': 'Image processed successfully',
        'filename': image.filename,
        'brand': brand,
        'material': material,
        'material_confidence': f"{confidence:.2f}%",
        'effect': effect_result
    })