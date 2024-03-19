import React from 'react'
import './style.css'
import Paragraph from '../../Common/Paragraph/Paragraph'
import { Button } from 'react-bootstrap'

const SuccessPopUp = ({setState}) => {
  return (
    <div className='pop-up-comp'>
        <div className='pop-up-box'>
            <div>
                <Paragraph value={"Successfully Completed"}/>
            </div>
            <div>
                <Button variant='success' onClick={()=>setState(false)}>Done</Button>
            </div>
        </div>
    </div>
  )
}

export default SuccessPopUp