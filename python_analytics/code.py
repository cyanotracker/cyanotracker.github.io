import pandas as pd
import matplotlib.pyplot as plt
from supabase import create_client, Client
import os
import numpy as np
# -----------------------------
# 1️) Supabase client setup
# -----------------------------


SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co'
SUPABASE_KEY = os.environ.get("REACT_APP_SUPABASE_API_KEY")       

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(" Connected to Supabase successfully.")
except Exception as e:
    raise SystemExit(f" Error connecting to Supabase: {e}")


# 2️) Fetch data from monthly_visitor_count SUpabase Table...
# -----------------------------
try:
    response = supabase \
        .from_("monthly_visitor_count") \
        .select("year_month, count") \
        .order("year_month",desc=False) \
        .execute()

    data = response.data

    if not data:
        raise ValueError("No data found in monthly_visitor_count")

    df = pd.DataFrame(data)
    print(f"📊 Retrieved {len(df)} rows from monthly_visitor_count.")

except Exception as e:
    raise SystemExit(f" Error fetching data: {e}")

# -----------------------------
# Cleaning the Data ETL processs...
# -----------------------------
try:
    # Drop nulls
    df = df.dropna(subset=['year_month', 'count'])

    # Convert types
    df['year_month'] = pd.to_datetime(df['year_month'], format='%Y-%m')
    df['count'] = pd.to_numeric(df['count'])

    # Calculate month-over-month % growth
    df = df.sort_values('year_month')
    df['pct_growth'] = df['count'].pct_change() * 100  # percentage

except Exception as e:
    raise SystemExit(f" Error processing data: {e}")

# -----------------------------
# -> Plot 1: Monthly Visitors Trend
# -----------------------------
try:
    plt.figure(figsize=(12, 6))
    plt.plot(df['year_month'], df['count'], marker='o', linestyle='-', color='teal', label='Monthly Visitors')

    plt.title('Monthly Visitors Trend', fontsize=16)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Number of Visitors', fontsize=12)
    plt.grid(True)
    plt.xticks(rotation=45)

     # 🔹 Set Y-axis scale with step of 50
    y_min = df['count'].min()
    y_max = df['count'].max()
    plt.yticks(np.arange(y_min - (y_min % 50), y_max + 50, 50))


    # Highlight peak
    max_idx = df['count'].idxmax()
    plt.annotate(f"Peak: {df['count'][max_idx]}", 
                 (df['year_month'][max_idx], df['count'][max_idx]),
                 textcoords="offset points", xytext=(0,10), ha='center')

    plt.legend()
    plt.tight_layout()


    plt.savefig("monthly_visitors_trend.png", dpi=300, bbox_inches="tight")

    plt.show()

except Exception as e:
    print(f" Error plotting monthly visitors trend: {e}")

# -----------------------------
# 5_> Plot 2: Month-over-Month % Growth
# -----------------------------
try:
    plt.figure(figsize=(12, 6))
    plt.bar(df['year_month'], df['pct_growth'], color='orange', alpha=0.7, label='% Growth')

    plt.title('Month-over-Month Growth of Visitors', fontsize=16)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Percentage Growth (%)', fontsize=12)
    plt.grid(True, axis='y', linestyle='--', alpha=0.7)
    plt.xticks(rotation=45)
    plt.axhline(0, color='black', linewidth=1, linestyle='--')  # baseline 0%

    plt.legend()
    plt.tight_layout()

    plt.savefig("month-over-month%growth.png", dpi=300, bbox_inches="tight")
    plt.show()

except Exception as e:
    print(f" Error plotting % growth: {e}")
