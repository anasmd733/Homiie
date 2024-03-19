import React from 'react'
import Paragraph from '../Paragraph/Paragraph'
import Button from '../Submit/Button'
import "./DeletePopUp.css"
const DeletePopUp = ({CancelonClick , DeleteonClick ,className}) => {
  return (
    <div className={className}>
    <div className='DeletePopUp-div'>
        <Paragraph className="DeletePopUp-para" value={"Are you sure you want to delete"}/>

        <div className='DeletePopUp-main-div'>
        <Button className='DeletePopUp-Cancel' value="Cancel" onClick={CancelonClick}/>
        <Button className='DeletePopUp-Delete' value="Delete" onClick={DeleteonClick}/>
        </div>
    </div>
    </div>
  )
}
export default DeletePopUp
