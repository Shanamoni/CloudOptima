
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

from forecast import forecast_cost
from anomaly import detect_anomalies

app = Flask(__name__)

# ---------------------------------
# Forecast Route
# ---------------------------------
@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        incoming = request.json

        if isinstance(incoming, dict) and "data" in incoming:
            data = incoming["data"]
        else:
            data = incoming

        prediction = forecast_cost(data)

        return jsonify({
            "predictedCost": float(round(prediction, 2))
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# Anomaly Route
# ---------------------------------
@app.route("/anomaly", methods=["POST"])
def anomaly():
    try:
        incoming = request.json

        if isinstance(incoming, dict) and "data" in incoming:
            data = incoming["data"]
        else:
            data = incoming

        anomalies = detect_anomalies(data)

        return jsonify(anomalies)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000, debug=True)
