import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Answer from './Answer'
import axios from 'axios'

const Form = ({ data }) => {
    const { id } = useParams();
    const [header, setHeader] = useState([]);
    const [description, setDescription] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {

        // finds the questionnary that matches the id provided by router
        const questionnary = data.filter(q => q.questionnaryId == id)
        if (questionnary.length > 0) {
            setHeader(questionnary[0].header)
            setDescription(questionnary[0].description)
            setQuestions(questionnary[0].questions)
        }

    }, [data])

    // while typing in the input fileds -> the first char is saved and the following chars are updated to answers-array.
    const saveAnswer = (answer) => {
        idExists(answer.question.questionId) ? update(answer) : add(answer)
    }

    // the decision to update or to save is based on wether the id exists in answers-array.
    const idExists = (questionId) => {
        return answers.some(function(a) {
            return a.question.questionId === questionId;
        }); 
    }

    const add = (toAdd) => {
        setAnswers([...answers, toAdd])
    }

    // updating the answer string (after each char) is done by overwriting previous string using its index.
    const update = (toUpdate) => {
        let updated = answers;
        let id = answers.findIndex(a => a.question.questionId === toUpdate.question.questionId);
        updated[id].answerText = toUpdate.answerText;
        setAnswers(updated)
    } 

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://theformback.herokuapp.com/answers', answers )
        .then(response=> {
            if (response.status === 200) {
                console.log('Lisättiin');
            } else {
                console.log('Lisäys ei onnistunut');
            }
        }) 
        
        /*
        
        axios({
            method: 'post',
            url: 'https://theformback.herokuapp.com/answers',
            data: answers

        });

        

        console.log(answers)

        console.log(

            [
                {
                    "question": { "questionId": 4 },
                    "answerText": "Onko kivaa?"
                },
                {
                    "question": { "questionId": 5 },
                    "answerText": "Miten menee?"
                },
                {
                    "question": { "questionId": 6 },
                    "answerText": "Toimiiko mikään?"
                }
            ]
        )
        */
    }

    const cleare = () => {
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Link to='/'>Palaa</Link>  
            <h2> { header } </h2>
            <label> { description } </label>
            <br/>
            <br/>
            { questions.map((question) => (
                <div key={ question.questionId }>
                    <Answer question={ question } saveAnswer={ saveAnswer }></Answer>             
                </div>
            ))}
            <br/>
            <input type='submit' value='Lähetä'/>
            <input type='button' value='Tyhjennä' onClick={ cleare }/>
        </form>
    );
}

export default Form;