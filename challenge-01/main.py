from flask import Flask, request, redirect, url_for
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

def is_authenticated_user():
    # In a real application, this function should check the user's authentication status.
    return True

@app.route('/')
def home():
    if not is_authenticated_user():
        logging.info('Unauthorized access attempt.')
        return redirect(url_for('login'))

    redirect_url = request.args.get('redirect_url')
    if redirect_url:
        logging.info(f'Redirecting to: {redirect_url}')
        return redirect(redirect_url)

    return 'Welcome to the home page!'

@app.route('/login')
def login():
    # Simulated login page
    return 'Login Page - User authentication goes here.'

if __name__ == '__main__':
    app.run(debug=False)
