from flask import Flask, request, jsonify
import os

def upload_image_handler():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    
    upload_folder = 'uploads'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, image.filename)
    image.save(file_path)
    
    return jsonify({'message': 'Image received successfully', 'filename': image.filename})