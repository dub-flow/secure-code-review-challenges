from flask import Flask, request

app = Flask(__name__)

USERNAME = "admin"
PASSWORD = "mypassword"

@app.route('/')
def home():
    return "Welcome to the Flask App!"

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if username == USERNAME and password == PASSWORD:
        return "Login successful!"
    else:
        return "Invalid credentials!"

if __name__ == '__main__':
    app.run(debug=False)
