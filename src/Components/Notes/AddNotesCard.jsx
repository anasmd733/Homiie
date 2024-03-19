import React from 'react'
import Button from '../../Common/Submit/Button'
import "./Notes.css"
import { useNavigate } from 'react-router-dom'
const AddNotesCard = ({path}) => {
  
  const Navigate=useNavigate()
  return (
    <div className='AddNotesCard-Main-Division'>
      <Button value={"Add +"} className='AddNotesCard-Button' onClick={()=>{Navigate(path)}}/>
    </div>
  )
}

export default AddNotesCard
