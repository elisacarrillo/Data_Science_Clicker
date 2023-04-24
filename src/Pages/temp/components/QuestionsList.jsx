import React, { useState, useEffect } from "react";
import "./QuestionsList.css"

const QuestionsList = ({ questions, activeQuestion, toggleActiveQuestion }) => {
  return (
    <>
      <h1>Questions</h1>
      <div className="QuestionsList">
      <ul>
        {questions.map((question) => (
          <li
            key={question._id}
            onClick={() => toggleActiveQuestion(question._id)}
          >
            {question.prompt} {activeQuestion === question._id && "*"}
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default QuestionsList;
