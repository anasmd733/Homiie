import React, { useEffect, useState } from 'react'
import SubmitButton from "../Submit/SubmitButton"
import FormHeading from "../FormCard/FormHeading"
import FormTextBox from '../FormCard/FormTextBox';
import "./FormCardStyle.css"
import BreadCrumbs from '../BreadCrums/BreadCrumbs';

const FormCard = ({onChange ,Heading , expenseDeteil , path , NavigateButton , pathState , submitPath , BreadCrumbsvalue ,onClick, onsubmitHandler, inpValue, isRadio ,BreadCrumbsClick }) => {


    useEffect(()=>{

    },[onClick])
  return (
    <div>
      <BreadCrumbs BreadCrumbsvalue={BreadCrumbsvalue} onClick={BreadCrumbsClick} className='FormCard-BreadCrumbs'/>
            <div className='FormCard-division'>

                <div className='FormCard-man-div'>
                <FormHeading value={Heading}/>
                <br /><br />
                <div>
                  <form action="" onSubmit={onsubmitHandler}>
{
    expenseDeteil && inpValue && expenseDeteil.map((Details, index) => (
      <React.Fragment key={index}>
        <FormTextBox
            inpValue={inpValue[Details.title]} 
            required={true} 
            name={Details.title} 
            onChange={onChange}  
            key={index}
            Value={Details.Name} 
            type={Details.type}
            disable={Details.disable}
        />
         <div className='radio-main-div'>
        {
         (isRadio && Details.radio.length > 0) && Details.radio.map((val,i)=>(
            <div className='radio-main-div' key={i}>
            <input type="radio" name='ledgerType' className='FormCard-radiobox' value={val} onChange={onChange} id={val} />
            <label htmlFor={val} className='FormCard-radiobox-label'>{val}</label>
            </div>
          ))
        }
         </div>
        </React.Fragment>
    ))
}

                <br />
                   <div className='FormCard-SubmitButton-division'>
                   <SubmitButton 
                      className='FormCard-SubmitButton' 
                      path={path}
                      pathState={pathState}
                      submitPath={submitPath}
                      onClick={onClick}
                   />
                    
                   </div>
                   </form>

                <div className='FormCard-NavButton-division'>
                  {NavigateButton}
                </div>
                </div>
                </div>
            </div>
    </div>
  )
}

export default FormCard

