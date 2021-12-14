import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TypeCheck from './Components/TypeCheck';
import TypeRadio from './Components/TypeRadio';
import TypeText from './Components/TypeText';

const Form = ({ data }) => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [current, setCurrent] = useState([]);

    useEffect(() => {

        // finds the questionnary that matches the id provided by router

        const questionnary = data.filter(q => q.questionnaryId.toString() === id)
        if (questionnary.length > 0) {
            setQuestions(questionnary[0].questions)
            setCurrent(questionnary[0])
        }

    }, [data, id])

    // the entered values are first stored in the object in update-array,
    // then objects with different id's (not matching with current id) are pushed to update-array,
    // and finaly the old answers is replaced by the update-array.
    const saveAnswer = (answer) => {
        let update = [{ "question":{ "questionId": answer.id.toString() }, "answerText": answer.answer }]
        answers.forEach(a => a.question.questionId!== answer.id && update.push(a))
        setAnswers(update)
    }
    // a separate add & delete function for checkbox since it might contain multiple answers under single id
    const updateCheckbox = (answer) => {
        let update = [...answers]
        let current = [{ "question":{ "questionId": answer.id.toString() }, "answerText": answer.answer }]
        update = answer.checked ? update.concat(current) : update.filter(a => a.question.questionId !== answer.id)
        setAnswers(update)
    }

    const handleSubmit = (e) => {
        //e.preventDefault()
        axios.post('https://theformback-sprint3.herokuapp.com/answers', answers)
        .then(response=> {
            if (response.status === 200) {
                console.log("Lisättiin");
            } else {
                console.log("Lisäys ei onnistunut");
            }
        }) 
    }

    const cleare = () => {
        window.location.reload();
    }

    const component = (question) => {
        var type = '';
        type = question.type.typeText === "Checkbox" ? <TypeCheck question={ question } updateCheckbox={ updateCheckbox }/> :
        type = question.type.typeText === "Radiobutton" ? <TypeRadio question={ question } saveAnswer={ saveAnswer }/> :
        type = question.type.typeText === "Text" && <TypeText question={ question } saveAnswer={ saveAnswer }/>
        return type

    }

    return (
        <form onSubmit={handleSubmit}>
            <Link to='/quest'>Palaa</Link>  
            <h2> { current.header } </h2>
            <label> { current.description } </label>
            <br/>
            <br/>
            { questions.map((question) => (
                <div key={ question.questionId }>
                    {component(question)}            
                </div>
            ))}
            <br/>
            <input type='submit' value='Lähetä'/>
            <input type='button' value='Tyhjennä' onClick={ cleare }/>
        </form>
    );
}

export default Form;