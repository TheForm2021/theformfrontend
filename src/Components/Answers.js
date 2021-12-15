import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TextAnswer from './TextAnswer';
import Piechart from './Piechart';

const Answers = ({ data }) => {
    const { id } = useParams();
    const [header, setHeader] = useState([]);
    const [description, setDescription] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        // finds the questionnary that matches the id provided by router
        const questionnary = data.filter(q => q.questionnaryId.toString() === id)
        if (questionnary.length > 0) {
            setHeader(questionnary[0].header)
            setDescription(questionnary[0].description)
            setQuestions(questionnary[0].questions)
        }

    }, [data, id])

    // printing the right component depending on the type on of question.
    const component = (question) => {
        var type = '';
        type = question.type.typeText === "Checkbox" ? <Piechart question={ question }/> :
        type = question.type.typeText === "Radiobutton" ? <Piechart question={ question }/> :
        type = question.type.typeText === "Text" && <TextAnswer question={ question }/>
        return type

    }
    return (
        <>
            <Link to='/admin' >Palaa</Link>  
            <h2> Vastaukset kyselyyn: { header } </h2>
            <label> { description } </label>
            <br/>
            <br/>
            { questions.map((question) => (
                <div key={ question.questionId }>
                    {component(question)}            
                </div>
            ))}
            <br/>
        </>
    );
}

export default Answers;