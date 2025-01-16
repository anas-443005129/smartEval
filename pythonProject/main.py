from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "1234",
    "database": "GP_back"
}

#Test
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

@app.route('/')
def home():
    return "W."

@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Query all cars
        cursor.execute("SELECT * FROM Cars;")
        cars = cursor.fetchall()

        return jsonify({"cars": cars})
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        #specific car by ID
        cursor.execute("SELECT * FROM Cars WHERE id = %s;", (car_id,))
        car = cursor.fetchone()

        if car:
            return jsonify(car)
        else:
            return jsonify({"error": "Car not found"}), 404
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    app.run(debug=True)