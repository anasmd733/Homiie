import React from 'react'
import FormTextBox from '../../Common/FormCard/FormTextBox'
import Button from '../../Common/Submit/Button'
import "./Notes.css"
const SaveNotesCard = ({onClick , CancelonClick , onChange ,value , }) => {
  return (
    <div className='SaveNotesCard-Main-Division'>
       <FormTextBox 
        Value={"File Name"} 
        type={"text"} 
        onChange={onChange} 
        inpValue={value}
        />
        
       <div className='SaveNotesCard-Button-Division'>
        <Button 
         value={"Cancel"} onClick={CancelonClick} className='SaveNotesCard-BelowTableButton'/>

        <Button value={"Save"} className='Button-SaveNotesCard' onClick={onClick}/>
       </div>
    </div>
  )
}

export default SaveNotesCard
