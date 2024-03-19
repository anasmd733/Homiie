import React from 'react'
import Paragraph from '../../Paragraph/Paragraph'
import './style.css'
import { Colors } from '../../../Colors/Colors'
import defaultImg from '../../../assets/Group 2124.png'

const DashBoardCard = ({img, heading, content}) => {
  return (
    <div className='dashBoard-card-div'>
        <div className="dash-card-img-div">
            <img src={img} alt="" />
        </div>
        <div className="dash-card-content-div">
            <div className="dash-card-content-head">
                <Paragraph value={heading} style={{color: Colors.lightDarkBlue,fontSize:'18px',fontWeight:'bold'}}/>
            </div>
            <div className="dash-card-content">
                <Paragraph value={content} style={{color: Colors.gray,fontSize:'12px'}}/>               
            </div>
        </div>
    </div>
  )
}

DashBoardCard.defaultProps = {
    img : defaultImg,
    heading : 'No Data',
    content : '',
}

export default DashBoardCard