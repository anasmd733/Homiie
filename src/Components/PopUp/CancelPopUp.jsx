import React from 'react'
import Paragraph from '../../Common/Paragraph/Paragraph'
import { Button } from 'react-bootstrap'

const CancelPopUp = ({ setState }) => {
  return (
    <div className='pop-up-comp'>
        <div className='pop-up-box'>
            <div>
                <Paragraph value={"Error occurred"}/>
            </div>
            <div>
                <Button variant='danger' onClick={()=>setState(false)}>Done</Button>
            </div>
        </div>
    </div>
  )
}

export default CancelPopUp