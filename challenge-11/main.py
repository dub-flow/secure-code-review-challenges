from flask import Flask

app = Flask(__name__)

@app.route('/admin')
def admin():
    return "Admin area accessed!"

@app.route('/')
def admin():
    return "Hello World!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)