import React from 'react'
import CommonPara from '../../Common/Para/Para'
import CommonButton from '../../Common/Button/Button'
import './Renewel.css'

const Renewelpop = ({HandlepopBack,popupCon,True,False,HandleTrue}) => {
  return (
    <div className='renewelpopContainer'>
    <div className="renewelContainer">
    <CommonPara className='renewelpopupContent' label={popupCon} />
      <div className="renewelpopupbtn">
        <CommonButton className='Surebtn' onClick={()=>HandleTrue()} label={True}/>
        <CommonButton className='Cancelbtn' onClick={()=>HandlepopBack()} label={False}/>
      </div>
    </div>
    </div>
  )
}

export default Renewelpop