import react, { useEffect } from 'react';
import { useState } from 'react';

const Classroom_test = () => {
    const [classroomId, setClassroomId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMIT");
        for (var i = 0; i < questions.length; i++) {
            console.log(questions[i]._id);
            console.log(answers[i]);
            console.log(classroomId);
            fetch("http://localhost:3000/api/answers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: questions[i]._id,
                    answer: answers[i].answer,
                    classroomId: classroomId
                    })
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    alert("Submitted " + i + "!");
                }
                )
                .catch((error) => {
                    console.error("Error:", error);
                }
                );
        }
        

        
    }
    const onChangingAnswer = (e) => {
        console.log("CHANGING ANSWER");
        console.log(e.target.value);
        console.log(e.target.id);
        var id = e.target.id;
        
        var answer = e.target.value;
        
        // push to answers array, update if id already exists
        //
        
        // check if id exists in answers array
        // if it does, update the answer
        // if it doesn't, push to answers array
        //
       
                if (answers[id] != undefined) {
                    answers[id].answer = answer;
                    setAnswers(answers);
                    console.log("UPDATED ANSWER");
                    console.log(answers);
                    return;
                } else {
                    
                    setAnswers([...answers, { answer: answer}]);
                }
        console.log("PUSHED ANSWER");


        console.log(answers);
    }
    useEffect(() => {

        var url = window.location.href;
        var id = url.split("/")[4];
        setClassroomId(id);
            const getQuestions = async(id) => {
                const response = await fetch ("http://localhost:3000/api/questions/" + id, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },



                }
                ).then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    console.log("DATA", data.data)
                    setQuestions(data.data);
                    
                }).catch((error) => {
                    console.error("Error:", error);
                });
            }
            getQuestions(id);
            console.log(questions);


        }, []);
        // console.log(questions[0].type)
    return (
        <div>
        <h1>Classroom Test</h1>

        {/* map through each question, if multiple choice print A if numeric print b */}
        {questions.map((question, i) => (
            
            <div>
                <p>{question.prompt}</p>
                {/* <p>{question.type}</p> */}
                {/* if question.type == numeric then display A */}
                {(question.type == "numeric") && 
                <div>
                <input type="text" name="answer" id={i} placeholder='Answer' onChange={onChangingAnswer}></input>
                {/* <button onClick={onSubmit}>Submit</button> */}
                </div>}
                {(question.type == "multiple-choice") && 
                <div>
                    {/* map through answer choices} */}
                    <select class="form-control" id={i} onChange={onChangingAnswer}>
                    {question.multipleChoiceAnswers.map((answerChoice) => (
                        
                        
                            <option >{answerChoice}</option>
                            
                            
                        
                            
                    ))}
                    </select>
                    {/* <button onClick={onSubmit}>Submit</button> */}
                    </div>
                }

                
                   

            </div>
        ))}
        <br></br>
        <button onClick={onSubmit}>Submit</button> 
       
        </div>
    );
    }

export default Classroom_test;