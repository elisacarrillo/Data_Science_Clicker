import React, { useState, useEffect } from "react";
import "./CreateQuestionForm.css"

function SelectBox({ numBoxes, onNumBoxesChange }) {
  return (
    <div>
      <select id="num-boxes" className = "QuestionEditorText" onChange={onNumBoxesChange} value={numBoxes}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

function TextBoxes({ numBoxes }) {
  const textBoxes = [];
  for (let i = 0; i < numBoxes; i++) {
    textBoxes.push(<input type="text" key={i} className="text-box" />);
  }
  return (
    <div className="text-box-container">
      {textBoxes}
    </div>  
  );
}

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
  const [numBoxes, setNumBoxes] = useState(1);

  const handleSelectChange = (e) => {
    setNumBoxes(parseInt(e.target.value));
  }

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
        <SelectBox numBoxes={numBoxes} onNumBoxesChange={handleSelectChange} />
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
          <input 
          type = "text"
          className="questionBox"
          placeholder="Type your Question Here"
          />
          <br/>
          {questionType === "multiple-choice" && (
          <>
            {/* {choices.map((choice, index) => (
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
            </button> */}
            <TextBoxes numBoxes={numBoxes} />
          </>
        )}

        {questionType === "numeric-input" && (
          <div className="text-box-container">
          <input
            type="number"
            value={numericAnswer}
            onChange={(e) => setNumericAnswer(e.target.value)}
            className="NumericInput"
          />
          </div>
        )}
      <br/>
      <button type="submit" className="buttonSubmit">Add question</button>
         
        </div>
      </div>


      

    </form>
  );
};

export default CreateQuestionForm;
