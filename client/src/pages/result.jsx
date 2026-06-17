import React from "react";

function Result({
  scores,
  evaluations,
}) {
  const total =
    scores.reduce(
      (a, b) => a + b,
      0
    );

  const finalScore =
    scores.length > 0
      ? Math.round(
          (total /
            (scores.length * 10)) *
            100
        )
      : 0;

  return (
    <div className="card">
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        🎉 Interview Complete
      </h1>

      <h2
        style={{
          color: "#22c55e",
          textAlign: "center",
          marginTop: "20px",
          fontSize: "42px",
        }}
      >
        {finalScore}/100
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          textAlign: "center",
        }}
      >
        Overall Performance
      </p>

      <div
        style={{
          marginTop: "25px",
          color: "white",
        }}
      >
        {evaluations.map(
          (item, index) => (
            <div
              key={index}
              style={{
                marginBottom:
                  "15px",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "15px",
                borderRadius:
                  "12px",
              }}
            >
              <h3>
                Question{" "}
                {index + 1}
              </h3>

              <p>{item}</p>
            </div>
          )
        )}
      </div>

      <button
        className="start-btn"
        onClick={() =>
          window.location.reload()
        }
      >
        🔄 New Interview
      </button>
    </div>
  );
}

export default Result;