"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def User_add():
    request_body_user = request.get_json()
    
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    

    if email is None:
        return 'You need to specify the email', 400
    if password is None:
        return 'You need to specify the password', 400
    

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "User already exists"})
    else:
        new_user = User(email=request_body_user['email'], 
                        password=request_body_user['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User added successfully!"}), 200



@api.route('/user', methods=['GET'])
def User_get():
    user = User.query.all()
    user = list(map(lambda user: user.serialize(), user))
    return jsonify({"results": user})


@api.route("/login", methods =["POST"])
def login():
    print("init")
    body = request.get_json()
    
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the email', status_code=400)

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email = email, password = password).first()
    print (user)
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity = email)

    return jsonify({
        "email": email,
        "token": access_token
    })


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

