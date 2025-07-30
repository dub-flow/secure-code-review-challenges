from flask import Flask, request, redirect, url_for

app = Flask(__name__)

# Simulated "authentication" check
def is_authenticated():
    return True

class User:
    def __init__(self, username):
        self.username = username

    def get_username(self):
        return self.username

# Assume that this talks to an actual database instead of returning hardcoded data
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
    return '''
        <form action="/edit-profile" method="post">
            <input type="text" name="username" value="testuser" />
            <input type="submit" value="Edit Profile" />
        </form>
    '''

@app.route('/edit-profile', methods=['POST'])
def edit_profile():
    if not is_authenticated():
        return redirect(url_for('login'))

    username = request.form.get('username')
    user_profile = user_profile_service.get_user_profile(username)

    if user_profile and user_profile.get_username() == username:
        return user_profile_service.update_user_profile(user_profile)

    return "User not found or mismatch", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
