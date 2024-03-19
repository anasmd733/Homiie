import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const RadioButton = ({value, label}) => {
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
      <FormControlLabel value={value} control={<Radio/>} label={label} />
  
      </RadioGroup>

    </div>
  )
}
RadioButton.defaultProps = {
  value : '',
  label : ''
}

export default RadioButton