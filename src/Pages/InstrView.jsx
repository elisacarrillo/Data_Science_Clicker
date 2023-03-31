import react from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const InstrView = () => {
    const [classCode, setClassCode] = useState("");
    const [postQuestion, setPostQuestion] = useState(false);
    const [questionType, setQuestionType] = useState(3);

    const getClassCode = () => {
        console.log("Get Class Code");
        // get class code from url
        var url = window.location.href;
        var classCode = url.substring(url.lastIndexOf('/') + 1);
        setClassCode(classCode);
        console.log(classCode);
    }
    const postQ = () => {
        console.log("Post Question");
        setPostQuestion(true);
        
    }
    const createQuestionOutline = () => {
        console.log("Create Question Outline");
        // get question type
        // if numeric ( question type = 0)
        //     get question
        //     get answer
        //     get range

        // if multiple choice ( question type = 1)
        //     get question
        //     get answer
        //     get choices
        //     get correct choice
        
        // get questionType
        var questionType = document.getElementById("questionType").value;
        console.log(questionType);
        // if numeric
        if (questionType == "Numeric i.e. the user will input a number") {
            console.log("Numeric");
            setQuestionType(0);
        }
        // if multiple choice
        if (questionType == "Multiple Choice i.e. the user will input A/B/C/D") {
            console.log("Multiple Choice");
            setQuestionType(1);
        }



    }

    const post = () => {
        console.log("Post");
        // post question to database
        // if numeric
        if (questionType == 0) {
            console.log("Numeric");
            // get question
            var question = document.getElementById("question").value;

            // get answer
            var answer = document.getElementById("answer").value;

            fetch('http://localhost:3000/api/question/' + classCode , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: question,
                        numericAnswer: answer,
                        type: "numeric",
                        code: classCode
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert("Question Posted");
                    }
                    )
                    .catch((error) => {
                        console.error('Error:', error);
                    }
                    );

        }
        // if multiple choice
        if (questionType == 1) {
            console.log("Multiple Choice");
            // get question
            var question = document.getElementById("question").value;

            // get answer
            var answerA = document.getElementById("answerA").value;
            var answerB = document.getElementById("answerB").value;
            var answerC = document.getElementById("answerC").value;
            var answerD = document.getElementById("answerD").value;
            var answerE = document.getElementById("answerE").value;
            var correctAnswer = document.getElementById("correctAnswer").value;

            fetch('http://localhost:3000/api/question/' + classCode , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: question,
                        multipleChoiceAnswers: [answerA, answerB, answerC, answerD, answerE],
                        correctAnswerIndex: correctAnswer,
                        type: "multiple-choice",
                        code: classCode
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert("Question Posted");
                    }
                    )
                    .catch((error) => {
                        console.error('Error:', error);
                    }
                    );

        }
        // post question to database
        
        }
    useEffect(() => {
        getClassCode();
    }, []);
    return (
        <>
        <div>
            <p>Instructor View Classroom {classCode}</p>
            <button onClick = {postQ}>Post Question</button>
            <button>View Questions</button>
            <button>End Class</button>
        </div>
        {postQuestion ? <div>
            <p>Post Question</p>
            
            <form>
            <div class="form-group">
                
                <select class="form-control" id="questionType">
                <option>Numeric i.e. the user will input a number</option>
                <option>Multiple Choice i.e. the user will input A/B/C/D</option>
                
                </select>
            </div>
            </form>
            

            <button onClick={createQuestionOutline}>Create</button>
        </div> : null}
        {questionType == 0 ? <div>
            <p>Numeric Question</p>
            <form>
                <div class="form-group">
                   
                    <input type="text" class="form-control" id="question" placeholder="Enter question"></input>
                    <br></br>
                    <input type="text" class="form-control" id="answer" placeholder="Enter answer"></input>
                    </div>

                    
                    </form>
                    <button onClick={post}>Post Question</button>
        </div> 
        
        : null}
        {questionType == 1 ? <div>
            <p>Multiple Choice Question</p>
            <form>
                <input type="text" class="form-control" id="question" placeholder="Enter question"></input>
                <br></br>
                <input type="text" class="form-control" id="answerA" placeholder="Enter answer choice A"></input>
                <br></br>
                <input type="text" class="form-control" id="answerB" placeholder="Enter answer choice B"></input>
                <br></br>
                <input type="text" class="form-control" id="answerC" placeholder="Enter answer choice C"></input>
                <br></br>
                <input type="text" class="form-control" id="answerD" placeholder="Enter answer choice D"></input>
                <br></br>
                <input type="text" class="form-control" id="answerE" placeholder="Enter answer choice E"></input>
                <br></br>
                <input type="text" class="form-control" id="correctAnswer" placeholder="Enter correct answer (0 - 4)"></input>

            </form>
            <button onClick={post}>Post Question</button>
        </div> : null}

        </>

    );
}
export default InstrView;
