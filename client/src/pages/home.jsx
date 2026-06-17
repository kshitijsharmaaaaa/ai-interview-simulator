import React from "react";

function Home({
  name,
  setName,
  role,
  setRole,
  startInterview,
  loading,
}) {
  return (
    <div className="card">
      <div className="robot">🤖</div>

      <h1>
        <span>AI Interview</span>
        <br />
        Simulator
      </h1>

      <p className="subtitle">
        Practice. Prepare. Perform.
      </p>

      <div className="input-group">
        <label>Your Name</label>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Select Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">
            Select Your Role
          </option>

          <option>
            Frontend Developer
          </option>

          <option>
            Java Developer
          </option>

          <option>
            AI Engineer
          </option>

          <option>
            Full Stack Developer
          </option>
        </select>
      </div>

      <button
        className="start-btn"
        onClick={startInterview}
      >
        {loading
          ? "Loading..."
          : "🚀 Start Interview"}
      </button>

      <div className="features">
        <span>⚡ AI Powered</span>
        <span>🎯 Realistic Questions</span>
        <span>📈 Performance Insights</span>
      </div>

      <p className="secure">
        🔒 Your data is secure and private
      </p>
    </div>
  );
}

export default Home;