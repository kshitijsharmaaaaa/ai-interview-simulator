import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  function ScoreChart({ scores }) {
    const data = scores.map(
      (score, index) => ({
        question: `Q${index + 1}`,
        score,
      })
    );
  
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          marginTop: "20px",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="question" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default ScoreChart;