import React from 'react'
// import { FormCardStyle } from '../../Common/FormCard/FormCardStyle';
import Label from '../../Common/Label/Label';
import Paragraph from '../../Common/Paragraph/Paragraph';
import '../../Common/FormCard/FormCardStyle.css'

const FormTextBox = ({Value}) => {
  return (
<div>
<div className='FormTextBox-Main-division'>
        <div className='FormTextBox-Name-division'>
        <Label value={Value}/>
      
        <Paragraph value={":"} className='FormTextBox-semicolon'/>
        </div>

        <div className='FormTextBox-Textbox-division'>
            <textarea name="" id="" cols="30" rows="10" className='FormTextBox-Textbox'></textarea>
            {/* <Textbox type={type} className='FormTextBox-Textbox'/> */}
        </div>
    </div>
    <br />
</div>
  )
}

export default FormTextBox;