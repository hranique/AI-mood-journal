export const sendEntry = async (text) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    // If backend fails (500, 404, etc.)
    if (!res.ok) {
      console.error("HTTP ERROR:", res.status);
      return null;
    }

    const data = await res.json();

    console.log("🔥 BACKEND RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return null;
  }
};