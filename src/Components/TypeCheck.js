import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TypeCheck({ question, saveAnswer, answers }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const current = answers.filter(answer => answer.id === question.questionId)
    setSaved(current)
  },[answers])

  const checked = (e) => {
    return e.target.checked;
  }

  const remove = (e) => {
    const update = saved[0].answer.filter(a => a !== e.target.value)
    return {'id': parseInt(e.target.id), 'answer': update}
  }

  const add = (e) => {
    let update = saved
    if (update.length > 0) {
      update = {'id': parseInt(e.target.id), 'answer': update[0].answer.concat(e.target.value)}
    } else {
      update = {'id': parseInt(e.target.id), 'answer': [e.target.value]}
    }
    return update
  }

  const handeleChanged = (e) => {
    const groupUpdate = checked(e) ? add(e) : remove(e)
    saveAnswer(groupUpdate)
  }

  return (
  <FormControl sx={{ display: "inline" }} key={ question.questionId }>
    <FormGroup sx={{ my: 2 }}>
        <FormLabel>{ question.questionText }</FormLabel>
        {question.options.map((o) => (
          <FormControlLabel
            key={ o.optionId }
            control={ <Checkbox value={ o.optionId} id={question.questionId.toString()} onChange={handeleChanged}/> }
            label={ o.optionText }
          />))}
    </FormGroup>
   </FormControl>
  );
}