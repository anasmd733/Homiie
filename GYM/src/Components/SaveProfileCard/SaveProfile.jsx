import React from 'react'
import './SaveProfile.css'
import CommonButton from '../../Common/Button/Button'
import CommonInput from '../../Common/Input/Input'
import CommonPara from '../../Common/Para/Para'

const SaveProfile = () => {
     const InputValue=[
        {value:'Age',num:'20'},
        {value:'Gender',num:'Male'},
        {value:'Contact Number',num:'7604974029'},
        {value:'City',num:'Kumbakonam'}
    ]

    const ParaValue=[
        {label:'Duration',lable1:'6 Months'},
        {label:'Joining Date',lable1:'28 Nov 2023'},
        {label:'Expired till',lable1:'5 days'},
        {label:'Expired Date',lable1:'28 Nov 2024'},
    ]
  return (
    <div className="FullEditProfile">
        <div className="EditprofileCon">
            <div className="TopContnt">
                <CommonPara label="view profile" className="viewpfle"/>
                <CommonPara label="Back"/>
            </div>
            <div className="ProfilePic"></div>
            <div className="ProfileName">
                <CommonPara label="Krishn Kumar" className="Name"/>
            </div>
            <div className="mainInput">
            {
                InputValue.map((value,index)=>(
                    <div className="InputMain">
                        <CommonInput value={value.value} className="Inputcnt" boolean={true}/>
                        <CommonInput value={value.num} className="Inputcnt2" boolean={true}/>
                    </div>
                ))
            }
            </div>
            <div className="BottomPara">
            <div className="mainPara">
               {
                ParaValue.map((value,index)=>(
                    <div className="paraInner">
                        <CommonPara label={value.label} className="ParaCnt"/>
                        <CommonPara label={value.lable1} className="ParaCnt1"/>
                    </div>
                ))
               }
            </div>
            </div>
            <div className="edit-save-btn">
                <CommonButton label="Save" className="SaveBtn"/>
                <CommonButton label="Edit" className="EditBtn"/>
            </div>

        </div>
    </div>
  )
}
export default SaveProfile





