from flask import Flask, request, send_from_directory, jsonify
import requests
import ipaddress
import logging
import socket
from urllib.parse import urlparse

app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)

def is_localhost(ip_or_hostname):
    try:
        resolved_ip = socket.gethostbyname(ip_or_hostname)
    except socket.gaierror:
        return False

    try:
        ip = ipaddress.ip_address(resolved_ip)
        return ip.is_loopback
    except ValueError:
        return False

@app.route('/secret')
def secret():
    if not is_localhost(request.remote_addr):
        return jsonify({"error": "Forbidden"}), 403
    return send_from_directory('static', 'secret.html')

@app.route('/fetch', methods=['GET'])
def fetch_url():
    target_url = request.args.get('url')
    
    if not target_url:
        return jsonify({"error": "URL parameter is required"}), 400

    parsed_url_hostname = urlparse(target_url).hostname
    app.logger.info(f'Provided URL hostname to fetch: {parsed_url_hostname}')
    if is_localhost(parsed_url_hostname):  
        return jsonify({"error": "Requests to localhost are not allowed."}), 400
    
    try:
        response = requests.get(target_url)
        return response.text
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
