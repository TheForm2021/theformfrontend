import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Plot from 'react-plotly.js';
import React, { useState, useEffect } from 'react';

export default function Piechart({ question }) {

    //const json = JSON.stringify(question.answers);
    //console.log(json)

    const [values, setValues] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        let num = []
        const data = question.answers.map(a => a.answerText);
        const unique = [...new Set(data)];
        unique.forEach(text => num.push(data.filter(a => a === text).length))
        setLabels(unique);
        setValues(num)
    }, [question])

    return (
        <>
            <Card className='Cont'>  
                <CardContent>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                        {question.questionText}
                    </Typography>
                    <Plot
                        data={[{ values: values, labels: labels, type: 'pie' }]}
                        layout={{ height: 400, width: 500}}
                    />
                </CardContent>
            </Card>
        </>
    );
}