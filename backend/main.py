import os
from flask import Flask, jsonify
from flask_cors import CORS
from db import engine, Base
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Create tables
Base.metadata.create_all(bind=engine)

@app.route('/api/home')
def health_check():
    return jsonify({"status": "healthy", "message": "Flask backend with PostgreSQL is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)