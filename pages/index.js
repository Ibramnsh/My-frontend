import { useState } from "react";
import { fetchAPI } from "../lib/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  const fetchMessage = async () => {
    try {
      setError("");
      const data = await fetchAPI("/api/message");
      setMessage(data.message);
    } catch (err) {
      setError(`Error: ${err.info || err.message}`);
      console.error("API Error:", err);
    }
  };

  const sendName = async () => {
    try {
      setError("");
      const data = await fetchAPI("/api/greet", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setGreeting(data.message);
    } catch (err) {
      setError(`Error: ${err.info || err.message}`);
      console.error("API Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Vercel FE-BE Connection Example</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <section style={{ marginBottom: "2rem" }}>
        <h2>GET Example</h2>
        <button onClick={fetchMessage}>Get Message from Backend</button>
        {message && <p>{message}</p>}
      </section>

      <section>
        <h2>POST Example</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={sendName}>Send Name</button>
        {greeting && <p>{greeting}</p>}
      </section>
    </div>
  );
}
