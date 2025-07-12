from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path
import numpy as np

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dataset path
dataset_path = Path(__file__).parent / "dataset"

@app.get("/api/summary")
def get_summary():
    # Load datasets
    finance_df = pd.read_csv(dataset_path / "finance.csv", na_values=['N/A'])
    hr_df = pd.read_csv(dataset_path / "hr.csv")
    ops_df = pd.read_csv(dataset_path / "operations.csv")

    # Calculate metrics
    total_revenue = finance_df["Revenue"].sum()
    
    # Get latest employee count from most recent quarter
    latest_year = finance_df["Year"].max()
    latest_quarter = finance_df[finance_df["Year"] == latest_year]["Quarter"].max()
    num_employees = finance_df[
        (finance_df["Year"] == latest_year) & 
        (finance_df["Quarter"] == latest_quarter)
    ]["Employee_Count"].sum()
    
    departments = finance_df["Division"].unique().tolist()
    avg_performance = round(ops_df["Quality_Score_Pct"].mean(), 2)

    return {
        "total_revenue": int(total_revenue),
        "num_employees": int(num_employees),
        "departments": departments,
        "avg_performance": avg_performance
    }

@app.get("/api/finance")
def get_finance():
    df = pd.read_csv(dataset_path / "finance.csv", na_values=['N/A'])
    return df.replace({np.nan: None}).to_dict(orient="records")

@app.get("/api/hr")
def get_hr():
    df = pd.read_csv(dataset_path / "hr.csv")
    return df.to_dict(orient="records")

@app.get("/api/operations")
def get_operations():
    df = pd.read_csv(dataset_path / "operations.csv")
    return df.to_dict(orient="records")