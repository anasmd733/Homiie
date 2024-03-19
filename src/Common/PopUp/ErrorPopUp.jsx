import React from 'react'

const ErrorPopUp = ({isFailed, setIsFailed, message}) => {
    const okOnclick = ()=>{
        setIsFailed(false)
    }
  return (
    <>
        {
            isFailed &&
            <div className='pop-up-parent'>
                <div className='pop-up-align'>
                    <div className='pop-up-box'>
                        <p className='success-pop-msg'>{message}</p>
                        <button className='failed-btn-pop-up' onClick={okOnclick}>Done</button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ErrorPopUp