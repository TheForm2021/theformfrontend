import './App.css';
import React, { useState, useEffect } from 'react';

const Data = () => {
    
    //I have included a test_data.json file in the repository, that can be used instead of the REST api for test purposes.
    //let dataFromJson = require('./test_data.json');

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('/list')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.error(err))
    }

    return (
        data.map((i) => (
            <div className="Inquiry" key={i.questionnaryId}>
                <h4>{i.header}</h4>
                <h4>{i.description}</h4>
                {i.questions.map((q) => (
                    <p key={q.questionId}>{q.questionText}</p>
                ))}
            </div>
        ))
    );
}

export default Data;