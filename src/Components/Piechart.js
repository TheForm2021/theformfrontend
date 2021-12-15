import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Plot from 'react-plotly.js';
import React, { useState, useEffect } from 'react';

export default function Piechart({ question }) {

    const [values, setValues] = useState([]);
    const [labels, setLabels] = useState([]);
    const [numberOfAnswerers, setNumberOfAnswerers] = useState([]);

    useEffect(() => {
        let num = []
        const text = question.answers.map(a => a.answerText);
        const answerer = question.answers.map(a => a.answerer.answererId);
        const uniqueText = [...new Set(text)];
        const uniqueAnswerer = [...new Set(answerer)];
        uniqueText.forEach(item => num.push(text.filter(a => a === item).length))
        setLabels(uniqueText);
        setValues(num)
        setNumberOfAnswerers(uniqueAnswerer.length)
    }, [question])

    return (
        <>
            <Card className='Cont'>  
                <CardContent>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                        {question.questionText}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                        Kysymykseen on vastannut {numberOfAnswerers}.
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