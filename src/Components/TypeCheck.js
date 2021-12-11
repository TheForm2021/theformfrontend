import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TypeCheck({ question, updateCheckbox }) {

  const handeleChanged = (e) => {
    updateCheckbox({
      "id": question.questionId.toString(),
      "answer": e.target.value,
      "checked": e.target.checked
    })
  }

  return (
  <FormControl sx={{ display: "inline" }} key={ question.questionId }>
    <FormGroup sx={{ my: 2 }}>
        <FormLabel>{ question.questionText }</FormLabel>
        {question.options.map((o) => (
          <FormControlLabel
            key={ o.optionId }
            control={ <Checkbox value={ o.optionText} id={question.questionId.toString()} onChange={handeleChanged}/> }
            label={ o.optionText }
          />))}
    </FormGroup>
   </FormControl>
  );
}