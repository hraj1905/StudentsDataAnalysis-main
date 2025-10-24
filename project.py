import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv(r"C:\Users\Harsh\Downloads\StudentsDataAnalysisTeam\StudentsDataAnalysis-main\students_rows (1).csv")

# Plot styling
sns.set(style="whitegrid")

# --- 1. Correlation Heatmap ---
plt.figure(figsize=(10, 8))
numeric_df = df.select_dtypes(include='number')
if 'student_id' in numeric_df.columns:
    numeric_df = numeric_df.drop(columns=['student_id'])
correlation = numeric_df.corr()
sns.heatmap(correlation, annot=True, cmap='coolwarm', fmt=".2f", square=True)
plt.title("Correlation Heatmap")
plt.show()

# --- 2. GPA Distribution ---
if 'gpa' in df.columns:
    plt.figure(figsize=(8, 5))
    sns.histplot(data=df, x='gpa', bins=20, kde=True, color='skyblue')
    plt.title('GPA Distribution')
    plt.xlabel('GPA')
    plt.tight_layout()
    plt.show()

# --- 3. Attendance Rate Distribution ---
if 'attendance_rate' in df.columns:
    plt.figure(figsize=(8, 5))
    sns.histplot(data=df, x='attendance_rate', bins=20, kde=True, color='orange')
    plt.title('Attendance Rate Distribution')
    plt.xlabel('Attendance Rate')
    plt.tight_layout()
    plt.show()

# --- 4. Engagement Score Distribution ---
if 'engagement_score' in df.columns:
    plt.figure(figsize=(8, 5))
    sns.histplot(data=df, x='engagement_score', bins=20, kde=True, color='green')
    plt.title('Engagement Score Distribution')
    plt.xlabel('Engagement Score')
    plt.tight_layout()
    plt.show()

# --- 5. Risk Level Count ---
if 'risk_level' in df.columns:
    plt.figure(figsize=(6, 5))
    sns.countplot(data=df, x='risk_level', palette='Set2')
    plt.title('Risk Level Distribution')
    plt.tight_layout()
    plt.show()

# --- 6. GPA vs Attendance Rate (Colored by Risk Level) ---
if {'gpa', 'attendance_rate', 'risk_level'}.issubset(df.columns):
    plt.figure(figsize=(8, 6))
    sns.scatterplot(data=df, x='attendance_rate', y='gpa', hue='risk_level', palette='coolwarm', alpha=0.7)
    plt.title('Attendance Rate vs GPA (by Risk Level)')
    plt.xlabel('Attendance Rate')
    plt.ylabel('GPA')
    plt.tight_layout()
    plt.show()
