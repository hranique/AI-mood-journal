import React, { useState } from "react";
import { sendEntry } from "../api";

function JournalInput({ onAdd }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);

    const aiData = await sendEntry(text);

    const newEntry = {
      text,
      date: new Date().toLocaleString(),
      mood: aiData?.mood_score || "N/A",
      productivity: aiData?.productivity_score || "N/A",
      activities: aiData?.activities || [],
      sentiment: aiData?.sentiment || "unknown",
    };

    onAdd(newEntry);
    setText("");
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your day..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Add Entry"}
      </button>
    </div>
  );
}

export default JournalInput;