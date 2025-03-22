import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os
import argparse

def load_model(model_path, num_classes):
    model = models.resnet101(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    model.load_state_dict(torch.load(model_path, map_location='cpu'))
    model.eval()
    return model

def predict_image(image_path, model, dataset_dir='Fabrics'):
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
        outputs = model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
        top_prob, top_class = torch.topk(probabilities, 3)
    
    results = []
    for i in range(len(top_class)):
        class_idx = top_class[i].item()
        class_name = idx_to_class.get(class_idx, f"Unknown Class {class_idx}")
        probability = top_prob[i].item() * 100
        results.append((class_name, probability))
    
    return results

def main():
    parser = argparse.ArgumentParser(description='Classify fabric type from an image')
    parser.add_argument('image_path', help='Path to the image file')
    parser.add_argument('--model', default='models/resnet/Fabrics_classifier.pth', help='Path to the model file')
    parser.add_argument('--dataset', default='Fabrics', help='Path to dataset directory')  # Changed here

    args = parser.parse_args()
    
    if not os.path.exists(args.image_path):
        print(f"Error: Image file {args.image_path} not found")
        return
    
    if not os.path.exists(args.model):
        print(f"Error: Model file {args.model} not found")
        return
    
    if not os.path.exists(args.dataset):
        print(f"Warning: Dataset directory {args.dataset} not found")
        print("Using default class count (90)")
        num_classes = 90
    else:
        num_classes = len([f for f in os.listdir(args.dataset) if os.path.isdir(os.path.join(args.dataset, f))])
    
    model = load_model(args.model, num_classes)
    results = predict_image(args.image_path, model, args.dataset)
    
    print("\nClassification Results:")
    print("=====================")
    for class_name, probability in results:
        print(f"{class_name}: {probability:.2f}%")
    
    print(f"\nThe image is most likely {results[0][0]} with {results[0][1]:.2f}% confidence")

if __name__ == "__main__":
    main()