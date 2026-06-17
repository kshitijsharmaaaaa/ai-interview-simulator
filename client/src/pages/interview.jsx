import React, { useState } from "react";
import axios from "axios";

function Interview({
  question,
  questionNumber,
  nextQuestion,
  scores,
  setScores,
  evaluations,
  setEvaluations,
}) {
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3001/evaluate-answer",
        {
          question,
          answer,
        }
      );

      const text =
        response.data.evaluation;

      setEvaluation(text);

      setEvaluations((prev) => [
        ...prev,
        text,
      ]);

      const match = text.match(
        /Score:\s*(\d+)\/10/i
      );

      if (match) {
        setScores((prev) => [
          ...prev,
          Number(match[1]),
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        🤖 Question {questionNumber} / 5
      </h2>

      <div
        style={{
          color: "white",
          fontSize: "22px",
          lineHeight: "1.6",
        }}
      >
        {question}
      </div>

      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Type your answer..."
        style={{
          width: "100%",
          marginTop: "25px",
          height: "180px",
          borderRadius: "15px",
          padding: "15px",
          fontSize: "16px",
        }}
      />

      {!evaluation && (
        <button
          className="start-btn"
          style={{
            marginTop: "20px",
          }}
          onClick={submitAnswer}
        >
          {loading
            ? "Evaluating..."
            : "Submit Answer"}
        </button>
      )}

      {evaluation && (
        <>
          <div
            style={{
              marginTop: "25px",
              color: "white",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              background:
                "rgba(255,255,255,0.05)",
              padding: "15px",
              borderRadius: "15px",
            }}
          >
            <h3>🤖 AI Evaluation</h3>

            <p>{evaluation}</p>
          </div>

          <button
            className="start-btn"
            style={{
              marginTop: "20px",
            }}
            onClick={() => {
              setAnswer("");
              setEvaluation("");
              nextQuestion();
            }}
          >
            Next Question →
          </button>
        </>
      )}
    </div>
  );
}

export default Interview;