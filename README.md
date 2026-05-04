# AI-mood-journal

A full-stack web application that uses the Gemini AI API to analyze daily journal entries for mood, productivity, and sentiment, featuring real-time data visualization.

# Features

- Natural language journal input
- AI-powered mood & productivity scoring
- Activity extraction
- Sentiment analysis
- Live dashboard with charts (React + Recharts)

# Tech Stack

Frontend:

- React
- Recharts (data visualization)

Backend:

- Flask (Python)
- Gemini API (Google AI)

# Project Structure

AI-mood-journal/
│
├── backend/
│ └── app.py
│
├── frontend/
│ ├── src/
│ │ ├── Dashboard.jsx
│ │ ├── App.jsx
│ │ └── index.js
│ └── package.json
│
└── README.md

# Setup Instructions

1. Clone the repository
   git clone https://github.com/hranique/AI-mood-journal

Backend Setup (Flask) 2. Navigate to backend
cd backend 3. Install dependencies
pip install flask flask-cors requests 4. Add your Gemini API key

Open app.py and replace:

GEMINI_API_KEY = "YOUR_API_KEY"

with your actual API key.

Recommended (safer): use environment variable

# Mac/Linux

export GEMINI_API_KEY=your_key

# Windows

set GEMINI_API_KEY=your_key 5. Run backend server
python app.py

You should see:

Running on http://127.0.0.1:5000
Frontend Setup (React) 6. Open a new terminal and go to frontend
cd frontend 7. Install dependencies
npm install 8. Start the React app
npm start

App will run on:

http://localhost:3000

# How to Use

Open the app in your browser
Enter a journal entry such as:
Studied for 3 hours and felt productive but tired.
Went to the gym and felt good.
Worked on coding project and felt stressed but accomplished.

Click "Add Entry"
The app will:
Assign mood & productivity scores
Extract activities
Analyze sentiment
Display results in a chart

📊 Example Output
{
"mood_score": 7,
"productivity_score": 8,
"activities": ["studying", "gym", "coding"],
"sentiment": "positive"
}
⚠️ Known Limitations
AI responses may occasionally be inconsistent
Requires internet connection for API calls
API rate limits may apply (Gemini free tier)
🤖 AI Usage

This project uses:

Gemini API for natural language analysis
AI-assisted coding tools for development and debugging
📌 Future Improvements
Save entries to database (Supabase / MongoDB)
Authentication system
Weekly/monthly analytics
Improved UI/UX (themes, animations)
👨‍💻 Author
Ranique Huggins

📄 License

This project is for educational purposes.
