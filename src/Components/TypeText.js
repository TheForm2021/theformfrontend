import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function TypeText ({ question, saveAnswer }) {
    const [text, setText] = useState([]);

    // the post-array-item is generated here and saved by the inherited saveAnswer-parameter.
    
    const handeleChanged = (e) => {
        setText(e.target.value)
        saveAnswer({
            "id": question.questionId,
            "answer": e.target.value
        })
    }
    
    return (
        <FormControl sx={{ my: 2 }}>
            <FormLabel>{ question.questionText }</FormLabel>
            <TextareaAutosize
                id={question.questionId}
                type="text"
                value={text}
                required onChange={handeleChanged}
                aria-label="empty textarea"
                minRows={3}
                placeholder="Empty"
                style={{ width: 400 }}
            />
        </FormControl>
    );
}