import { useState } from 'react';
import Report from "./report.jsx";

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: "Paris"
        },
        {
            question: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correct: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: "Jupiter"
        }
    ]

    const empty = Array.from({length : questionBank.length}, () => null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswer] = useState(empty);
    const [quizCompleted, setQuizCompleted] = useState(false);

    function handleSelectOption(answer) {
        let newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswer(newAnswers);
        console.log(newAnswers);
    }

    function goPrev() {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        }
    }

    function goNext() {
        if (questionIndex < questionBank.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            //Quiz completed
            setQuizCompleted(true);
        }
    }

    function calculateScore() {
        let score = 0;
        answers.forEach((answer, index) => {if (answer === questionBank[index].correct) {score++}});
        return score;
    }

    function retryQuiz() {
        setQuizCompleted(false);
        setQuestionIndex(0);
        setAnswer(empty);
    }
    
    if (quizCompleted) {
        return <Report score = {calculateScore()} total={questionBank.length} retry={retryQuiz}/>
    }

    return (
        <div>
            <h2> Question {questionIndex + 1} </h2>
            <p className = "question">{questionBank[questionIndex].question}</p>
            {
                questionBank[questionIndex].answers.map((answer) => 
                    <button className = {"option" + (answer === answers[questionIndex]? " selected" : "")}onClick ={() => handleSelectOption(answer)}> {answer} </button>   
                )
            }
            <div className="nav-buttons">
                <button onClick = {goPrev} disabled = {questionIndex === 0}>Previous</button>
                <button onClick = {goNext} disabled = {answers[questionIndex] === null}>{questionIndex === questionBank.length - 1 ? "Finish quiz" : "Next"}</button>
            </div>
        </div> 
    )
}

export default Quiz;