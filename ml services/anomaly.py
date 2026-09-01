
# Anomaly Detection

import pandas as pd
from sklearn.ensemble import IsolationForest


def detect_anomalies(data):
    df = pd.DataFrame(data)

    model = IsolationForest(contamination=0.2, random_state=42)
    df["anomaly"] = model.fit_predict(df[["costUSD"]])

    results = []

    for i, row in df.iterrows():
        if row["anomaly"] == -1:
            results.append({
                "index": int(i),
                "costUSD": float(row["costUSD"])
            })

    return results
