import React from 'react'
import Paragraph from '../../../Paragraph/Paragraph'
import './style.css'

const DashBoardContentCard = ({title, value}) => {
  return (
    <div className='dash-cont-card-parent'>
        <div className="dash-cont-card-title-div">
            <Paragraph value={title} className='dash-cont-card-content'/>
        </div>
        <div className="dash-cont-card-value-div">
            <Paragraph value={value} className='dash-cont-card-content'/>
        </div>
    </div>
  )
}

DashBoardContentCard.defaultProps = {
  title : 'No Data',
  value : '-'
}

export default DashBoardContentCard