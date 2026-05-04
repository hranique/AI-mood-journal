import React, { useState } from "react";
// 1. Removed duplicate recharts imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "../App.css"; 
// 2. Imported the API function
import { sendEntry as apiSendEntry } from "../api"; 

export default function Dashboard() {
  const [entry, setEntry] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 3. ADDED: The missing function to handle the button click
  const handleSendEntry = async () => {
    if (!entry.trim()) return;
    setLoading(true);

    try {
      const result = await apiSendEntry(entry); 
      
      if (result) {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mood: result.mood_score,
          productivity: result.productivity_score,
          sentiment: result.sentiment,
        };
        // Add new entry to the top of the list
        setData((prev) => [newPoint, ...prev]);
        setEntry("");
      }
    } catch (error) {
      console.error("Error sending entry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 style={{ color: "#333", marginBottom: "30px" }}>Journal Dashboard</h1>

      {/* Input Section */}
      <div className="card">
        <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>How was your day?</h2>
        <textarea
          rows="4"
          placeholder="Describe your activities and how you felt..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        {/* 4. UPDATED: Changed onClick to use the new handleSendEntry function */}
        <button onClick={handleSendEntry} disabled={loading}>
          {loading ? "Analyzing with AI..." : "Log Entry"}
        </button>
      </div>

      {/* Chart Section */}
      <div className="card">
        <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>Performance Trends</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={[...data].reverse()}> {/* Reverse so chart reads left-to-right */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} name="Mood" />
              <Line type="monotone" dataKey="productivity" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} name="Productivity" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Entries List */}
      <div className="card">
        <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>Recent Logs</h2>
        {data.length === 0 ? <p style={{ color: "#888" }}>No entries yet.</p> : null}
        {data.map((d, i) => (
          <div key={i} className="entry-item">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <small style={{ color: "#666" }}>{d.time}</small>
              <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}>{d.sentiment}</span>
            </div>
            <p style={{ margin: "5px 0" }}>
              <strong>Mood: {d.mood}/10</strong> | <strong>Productivity: {d.productivity}/10</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}