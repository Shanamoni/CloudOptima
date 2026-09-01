
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np


def forecast_cost(data):
    df = pd.DataFrame(data)
    df["day"] = np.arange(len(df))

    X = df[["day"]]
    y = df["costUSD"]

    model = LinearRegression()
    model.fit(X, y)

    next_day = [[len(df)]]
    prediction = model.predict(next_day)

    return float(prediction[0])