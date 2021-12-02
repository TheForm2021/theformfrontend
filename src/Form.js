import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TypeCheck from './Components/TypeCheck';
import TypeRadio from './Components/TypeRadio';
import TypeText from './Components/TypeText';

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

    // the entered values are first stored in the object in update-array,
    // then objects with different id's (not matching with current id) are pushed to update-array,
    // and finaly the old answers is replaced by the update-array.
    const saveAnswer = (answer) => {
        let update = answer.answer.length > 0 ? [{ 'id': answer.id, 'answer': answer.answer}] : []
        answers.forEach(a => a.id !== answer.id && update.push(a))
        setAnswers(update)
        //console.log(update)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(answers)
        axios.post('https://theformback.herokuapp.com/answers', answers )
        .then(response=> {
            if (response.status === 200) {
                console.log('Lisättiin');
            } else {
                console.log('Lisäys ei onnistunut');
            }
        }) 
    }

    const cleare = () => {
        window.location.reload();
    }

    const component = (question) => {
        var type = '';
        type = question.type === "checkbox" ? <TypeCheck question={ question } saveAnswer={ saveAnswer } answers={ answers }/> :
        type = question.type === "radiobutton" ? <TypeRadio question={ question } saveAnswer={ saveAnswer }/> :
        type = question.type === "text" && <TypeText question={ question } saveAnswer={ saveAnswer }/>
        return type

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