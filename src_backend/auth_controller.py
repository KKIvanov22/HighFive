from flask import jsonify, request, make_response
from firebase_admin import auth, db
import logging

def register_handler():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    
    if not username or not password or not email:
        return jsonify({"error": "Missing username, password, or email"}), 400

    try:
        user_record = auth.create_user(email=email, password=password, display_name=username)
        ref = db.reference('Accounts')
        ref.child(user_record.uid).set({
        "Username": username,
        "Email": email
        })
        response = make_response(jsonify({"message": "registered successful"}), 200)
        response.set_cookie("user_id", user_record.uid, httponly=False, samesite='None', secure=True)
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def login_handler():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
    
    try:
        user_record = auth.get_user_by_email(email)
        user_data = db.reference('Accounts').child(user_record.uid).get()
        if user_data:
            response = make_response(jsonify({
                "message": "Login successful",
            }), 200)
            response.set_cookie("user_id", user_record.uid, httponly=False, samesite='None', secure=True)
            return response
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 401