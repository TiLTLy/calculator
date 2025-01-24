from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins by default

# Define the calculator functions
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

# Create routes for each operation
@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()

        if not all(key in data for key in ("operation", "x", "y")):
            return jsonify({"error": "Missing parameters"}), 400

        x = data["x"]
        y = data["y"]
        operation = data["operation"]

        if operation == "add":
            result = add(x, y)
        elif operation == "subtract":
            result = subtract(x, y)
        elif operation == "multiply":
            result = multiply(x, y)
        elif operation == "divide":
            result = divide(x, y)
        else:
            return jsonify({"error": "Invalid operation"}), 400

        return jsonify({"result": result})

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

