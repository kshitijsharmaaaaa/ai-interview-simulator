import axios from "axios";
import { useState } from "react";
import "./App.css";

import Home from "./pages/home";
import Interview from "./pages/interview";
import Result from "./pages/result";

function App() {
  const [screen, setScreen] = useState("home");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [questionNumber, setQuestionNumber] =
    useState(1);

  const [previousQuestions, setPreviousQuestions] =
    useState([]);

  const [scores, setScores] = useState([]);
  const [evaluations, setEvaluations] =
    useState([]);

  const startInterview = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3001/start-interview",
        {
          name,
          role,
          questionNumber: 1,
          previousQuestions: [],
        }
      );

      setQuestion(response.data.question);

      setPreviousQuestions([
        response.data.question,
      ]);

      setQuestionNumber(1);

      setScores([]);
      setEvaluations([]);

      setScreen("interview");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    if (questionNumber < 5) {
      try {
        const response = await axios.post(
          "http://localhost:3001/start-interview",
          {
            role,
            questionNumber:
              questionNumber + 1,
            previousQuestions,
          }
        );

        setQuestion(response.data.question);

        setPreviousQuestions((prev) => [
          ...prev,
          response.data.question,
        ]);

        setQuestionNumber((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    } else {
      setScreen("result");
    }
  };

  return (
    <div className="app">
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {screen === "home" && (
        <Home
          name={name}
          setName={setName}
          role={role}
          setRole={setRole}
          startInterview={startInterview}
          loading={loading}
        />
      )}

      {screen === "interview" && (
        <Interview
          question={question}
          questionNumber={questionNumber}
          nextQuestion={nextQuestion}
          scores={scores}
          setScores={setScores}
          evaluations={evaluations}
          setEvaluations={setEvaluations}
        />
      )}

      {screen === "result" && (
        <Result
          scores={scores}
          evaluations={evaluations}
        />
      )}
    </div>
  );
}

export default App;