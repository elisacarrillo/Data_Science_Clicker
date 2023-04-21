import React, { useState, useEffect } from "react";

const QuestionsList = ({ questions, activeQuestion, toggleActiveQuestion }) => {
  return (
    <>
      <h3>Questions</h3>
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
    </>
  );
};

export default QuestionsList;
