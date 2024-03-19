import React from 'react'
import './SuccussPopSTyle.css'

const SuccessPopUp = ({isSuccess, setIsSuccess, message}) => {
    const doneOnclick = ()=>{
        setIsSuccess(false)
    }
  return (
    <>
        {
            isSuccess &&
            <div className='pop-up-parent'>
                <div className='pop-up-align'>
                    <div className='pop-up-box'>
                        <p className='success-pop-msg'>{message}</p>
                        <button className='done-btn-pop-up' onClick={doneOnclick}>Done</button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default SuccessPopUp