import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Plot from 'react-plotly.js';

export default function Piechart({ question }) {

    const json = JSON.stringify(question.answers);
    console.log(json)
    const data = [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie'
    }];

    const layout = {
        height: 400,
        width: 500
      };

    return (
        <>
            <Plot
            data={data}
            layout={layout}
            />
            <Card className='Cont'>  
                <CardContent>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                        {question.questionText}
                    </Typography>
                    <br/>
                    {question.answers.map((answer, i) => (
                        <Typography gutterBottom  variant="body2" component="div" key={answer.answerId}>
                            {i + 1}. {answer.answerText}
                        </Typography>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}