const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("AI Interview Simulator Backend Running");
});

app.post("/start-interview", async (req, res) => {
  try {
    const {
      role,
      questionNumber = 1,
      previousQuestions = [],
    } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a professional technical interviewer.",
          },
          {
            role: "user",
            content: `
Role: ${role}

Current Question Number: ${questionNumber}

Previous Questions:
${previousQuestions.join("\n")}

Ask ONE new interview question.

Rules:
- Do not repeat any previous question.
- Make it relevant to the role.
- Only return the question.
`,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    const question =
      completion.choices[0].message.content;

    res.json({
      success: true,
      question,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate question",
    });
  }
});

/* ===========================
   AI ANSWER EVALUATION
=========================== */

app.post("/evaluate-answer", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical interview evaluator.",
          },
          {
            role: "user",
            content: `
Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY in this format:

Score: X/10

Feedback: Short constructive feedback.
`,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    const evaluation =
      completion.choices[0].message.content;

    res.json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Evaluation failed",
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});