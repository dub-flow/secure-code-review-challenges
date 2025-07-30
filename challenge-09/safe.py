from flask import Flask, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'change-me'  # Required for session

# Simulated "authentication" check
def is_authenticated():
    return True

def get_logged_in_username():
    return session.get('username')

class User:
    def __init__(self, username):
        self.username = username

    def get_username(self):
        return self.username

# Assume this talks to a real DB
class UserProfileService:
    def get_user_profile(self, username):
        if username == 'testuser':
            return User(username)
        return None

    def update_user_profile(self, user_profile):
        msg = f"Updated profile for user: {user_profile.get_username()}"
        print(msg)
        return msg

user_profile_service = UserProfileService()

@app.route('/')
def home():
    # Simulate login by setting session (REMOVE in real app)
    session['username'] = 'testuser'
    return '''
        <form action="/edit-profile" method="post">
            <input type="submit" value="Edit My Profile" />
        </form>
    '''

@app.route('/edit-profile', methods=['POST'])
def edit_profile():
    if not is_authenticated():
        return redirect(url_for('login'))

    logged_in_username = get_logged_in_username()
    user_profile = user_profile_service.get_user_profile(logged_in_username)

    if user_profile:
        return user_profile_service.update_user_profile(user_profile)

    return "User not found", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)