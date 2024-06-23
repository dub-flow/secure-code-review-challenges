from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/admin', methods=['POST'])
def admin_login():
    try:
        password = request.json.get('password')
        if not password:
            return jsonify({"error": "Password is required"}), 400

        # Call the bash script with the password as an argument
        result = subprocess.run(
            ['./validate_password.sh', password],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        output = result.stdout.decode().strip()
        if output == "true":
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Access Denied"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)
