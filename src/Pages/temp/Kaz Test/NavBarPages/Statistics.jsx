import React, { useState, useEffect } from "react";
import "./Statistics.css"

const Statistics = ({ questions }) => {
    //   console.log("herereerere");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
  
    useEffect(() => {
      if (selectedQuestion) {
        const fetchAnswers = async () => {
          const answersData = await getAnswers(selectedQuestion._id);
          console.log("answers", answersData);
          setAnswers(answersData);
        };
        fetchAnswers();
      }
    }, [selectedQuestion]);
  
    return (
      <>
        <h1>Statistics</h1>
        <div className="StatisticsContent">
        <select
          value={selectedQuestion?._id || ""}
          onChange={(e) => {
            const question = questions.find((q) => q._id === e.target.value);
            setSelectedQuestion(question);
          }}
        >
          <option value="">Select a question</option>
          {questions.map((question) => (
            <option key={question._id} value={question._id}>
              {question.prompt}
            </option>
          ))}
        </select>
        {selectedQuestion && (
          <>
            <h2>{selectedQuestion.prompt}</h2>
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>{JSON.stringify(answer)}</li>
              ))}
            </ul>
          </>
        )}
        </div>
      </>
    );
  };

  export default Statistics;