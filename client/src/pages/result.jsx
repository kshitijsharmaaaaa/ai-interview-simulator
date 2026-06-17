import React, {
  useState,
} from "react";

import axios from "axios";
import ScoreChart from "../components/ScoreChart";

function Result({
  scores,
  evaluations,
}) {
  const [showAnalytics, setShowAnalytics] =
    useState(false);

  const [report, setReport] =
    useState("");

  const [reportLoading, setReportLoading] =
    useState(false);

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

  const generateReport = async () => {
    try {
      setReportLoading(true);

      const response =
        await axios.post(
          "http://localhost:3001/generate-report",
          {
            evaluations,
          }
        );

      setReport(
        response.data.report
      );
    } catch (error) {
      console.log(error);
    } finally {
      setReportLoading(false);
    }
  };

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

      <button
        className="start-btn"
        style={{
          marginTop: "20px",
        }}
        onClick={() =>
          setShowAnalytics(
            !showAnalytics
          )
        }
      >
        📊 Show Analytics
      </button>

      {showAnalytics && (
        <>
          <ScoreChart
            scores={scores}
          />

          <button
            className="start-btn"
            style={{
              marginTop: "20px",
            }}
            onClick={
              generateReport
            }
          >
            {reportLoading
              ? "Generating..."
              : "🧠 Generate AI Report"}
          </button>

          {report && (
            <div
              style={{
                marginTop: "25px",
                color: "white",
                textAlign:
                  "left",
                whiteSpace:
                  "pre-wrap",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "20px",
                borderRadius:
                  "15px",
              }}
            >
              <h2>
                🧠 AI Interview
                Analysis
              </h2>

              <p>{report}</p>
            </div>
          )}

          <div
            style={{
              marginTop: "25px",
              color: "white",
            }}
          >
            {evaluations.map(
              (
                item,
                index
              ) => (
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
                    {index +
                      1}
                  </h3>

                  <p>{item}</p>
                </div>
              )
            )}
          </div>
        </>
      )}

      <button
        className="start-btn"
        style={{
          marginTop: "20px",
        }}
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