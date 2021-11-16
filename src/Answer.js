import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Answer = ({ question, saveAnswer }) => {
    const [text, setText] = useState([]);

    // the post-array-item is generated here and saved by the inherited saveAnswer-parameter.
    const handeleChanged = (e) => {
        setText(e.target.value)
        saveAnswer({
            "question": { "questionId": question.questionId },
            "answerText": e.target.value
        })
    }

    return (
        <div>
            <label>{question.questionText}</label>
            <br/>
            <TextareaAutosize
                type="text"
                value={text}
                required onChange={handeleChanged}
                aria-label="empty textarea"
                minRows={3}
                placeholder="Empty"
                style={{ width: 400 }}
            />
            <br/>
            <br/>
        </div>

    );
}
export default Answer;