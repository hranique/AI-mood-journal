import React from "react";

function EntryList({ entries }) {
  return (
    <div>
      <h2>Entries</h2>
      {entries.map((entry, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>Date:</strong> {entry.date}</p>
          <p>{entry.text}</p>
          <p>Mood: {entry.mood}</p>
          <p>Productivity: {entry.productivity}</p>
          <p>Activities: {entry.activities.join(", ")}</p>
          <p>Sentiment: {entry.sentiment}</p>
        </div>
      ))}
    </div>
  );
}

export default EntryList;