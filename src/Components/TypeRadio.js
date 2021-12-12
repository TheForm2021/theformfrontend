import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function TypeRadio({ question, saveAnswer }) {

  const handeleChanged = (e) => {
    saveAnswer({
        "id": question.questionId.toString(),
        "answer": e.target.value
    })
  }

  return (
    <FormControl sx={{ my: 2 }}>
      <FormLabel>{ question.questionText }</FormLabel>
      <RadioGroup> {question.options.map((o) => (
            <FormControlLabel
                key={ o.optionId }
                value={ o.optionText }
                control={ <Radio id={ question.questionId.toString() } required onChange={handeleChanged}/> }
                label={ o.optionText }
            />))}
        </RadioGroup>
    </FormControl>
  );
}

