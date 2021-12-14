import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function TextAnswer({ question }) {

    return (
        <>
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