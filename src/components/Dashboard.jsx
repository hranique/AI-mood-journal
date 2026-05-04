import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [entry, setEntry] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendEntry = async () => {
    if (!entry.trim()) return;

    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: entry }),
    });

    const result = await res.json();

    const newPoint = {
      time: new Date().toLocaleTimeString(),
      mood: result.mood_score,
      productivity: result.productivity_score,
      sentiment: result.sentiment,
    };

    setData((prev) => [...prev, newPoint]);
    setEntry("");
    setLoading(false);
  };

  return (
  <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
    
    {/* Header */}
    <div style={{
      background: "var(--card)",
      padding: "20px",
      borderRadius: "16px",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h1 style={{ margin: 0, color: "var(--text)" }}>
        🌸 Mood Journal Dashboard
      </h1>
      <p style={{ color: "#6b7280" }}>
        Track your mood, productivity, and habits with AI
      </p>
    </div>

    {/* Input Card */}
    <div style={{
      background: "var(--card)",
      padding: "20px",
      borderRadius: "16px",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <textarea
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginBottom: "10px"
        }}
        rows="4"
        placeholder="Write your journal entry..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button
        onClick={sendEntry}
        disabled={loading}
        style={{
          background: "var(--primary)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        {loading ? "Analyzing..." : "Add Entry"}
      </button>
    </div>

    {/* Chart Card */}
    <div style={{
      background: "var(--card)",
      padding: "20px",
      borderRadius: "16px",
      marginBottom: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h3>📊 Mood & Productivity Trend</h3>

      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mood" />
            <Line type="monotone" dataKey="productivity" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Entries */}
    <div>
      <h3 style={{ marginBottom: "10px" }}>📝 Entries</h3>

      {data.map((d, i) => (
        <div key={i} style={{
          background: "var(--card)",
          padding: "15px",
          borderRadius: "14px",
          marginBottom: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <p><b>Time:</b> {d.time}</p>
          <p><b>Mood:</b> {d.mood}</p>
          <p><b>Productivity:</b> {d.productivity}</p>
          <p><b>Sentiment:</b> {d.sentiment}</p>
        </div>
      ))}
    </div>

  </div>
);
}
