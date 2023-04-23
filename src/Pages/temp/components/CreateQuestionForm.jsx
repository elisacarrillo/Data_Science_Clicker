import React, { useState, useEffect } from "react";
import "./CreateQuestionForm.css"

const CreateQuestionForm = ({ handlePostQuestion }) => {
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [numericAnswer, setNumericAnswer] = useState(0);
  const [choices, setChoices] = useState([""]);

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const updateChoice = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      type: questionType,
      prompt: questionPrompt,
      numericAnswer: numericAnswer,
      multipleChoiceAnswers: choices,
    };
    handlePostQuestion(newQuestion)
      .then(() => {
        setQuestionPrompt("");
        setNumericAnswer(0);
        setChoices([""]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating question");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className = "QuestionForm">
        <div className="QuestionEditor">
        <button
          onClick={() => setQuestionType('multiple-choice')}
          className={questionType === 'multiple-choice' ? 'activeButton buttonQ' : 'buttonQ'}
        >
          Multiple Choice
        </button>
        <button
          onClick={() => setQuestionType('numeric-input')}
          className={questionType === 'numeric-input' ? 'activeButton buttonQ' : 'buttonQ'}
        >
          Numeric Input
        </button>

        <h1>Number of Choices: </h1>
        <input 
          type = "text"
          className="QuestionEditorText"
        />
        <h1>Correct Answer: </h1>
        <input 
          type = "text"
          className="QuestionEditorText"
        />
        <h1>Duration: </h1>
        <input 
          type = "text"
          className="QuestionEditorText"
        />


        </div>

        <div className="QuestionChoices">
          {questionType === "multiple-choice" && (
          <>
            {choices.map((choice, index) => (
              <div key={`choice-${index}`}>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  
                />
                <button type="button" onClick={() => removeChoice(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addChoice}>
              Add choice
            </button>
          </>
        )}

        {questionType === "numeric-input" && (
          <input
            type="number"
            value={numericAnswer}
            onChange={(e) => setNumericAnswer(e.target.value)}
          />
        )}

      <button type="submit">Add question</button>
         
        </div>
      </div>


      

    </form>
  );
};

export default CreateQuestionForm;
