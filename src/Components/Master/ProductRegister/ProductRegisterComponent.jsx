import React, { useEffect, useState } from "react";
import { ProductRegisterArr } from "./ProductRegisterArray";
import FormTextBox from "../../../Common/FormCard/FormTextBox";
import Paragraph from "../../../Common/Paragraph/Paragraph";
import SubmitButton from "../../../Common/Submit/SubmitButton";
import axios from "axios";
import SuccessPopUp from "../../PopUp/SuccessPopUp";
import CancelPopUp from "../../PopUp/CancelPopUp";
import { EndPoint } from "../../../EndPoints/EndPoint";

const ProductRegisterComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successPopUp, setSuccessPopUp] = useState(false)
  const [errorPopUp, setErrorPopUp] = useState(false)
  const [productNames, setProductNames] = useState([])
  const [NameTaken, setNameTaken] = useState(false)
  const [tamilNameTaken, setTamilNameTaken] = useState(false)
  const [productInput, setProductInput] = useState(
    {
      productId : "",
      productName : "",
      productNameTamil : "",
      productQuantity : "",
      quatityType : "",
      productRate : "",
      mark : false
    }
  )
  const productRegFun = async()=>{
    try{
      let response = (await axios.get(`${EndPoint}/productRegister`)).data
      let prodId = response[response.length-1].productId+1
      setProductInput(
        {
          productName : "",
          productNameTamil : "",
          productId : prodId,
          productQuantity : "",
          quatityType : "",
          productRate : "",
          mark : false
        }
      )
      const names = response.map((val)=>(
        {
          productName : val.productName,
          productNameTamil : val.productNameTamil
        }
      ))
      setProductNames(names)
      // console.log(names);
      setSuccess(true)
    } catch(err){
      console.error(err);
      setSuccess(false)
    }
    setIsLoaded(true)
  }
  useEffect(()=>{
    productRegFun()
  },[])
  const onChangeHandler = (e)=>{
    if(e.target.name == "productName"){
      if(productNames.some((val)=>val.productName.toLowerCase() == e.target.value.toLowerCase())){
        // alert("Already")
        setNameTaken(true)
      }
      else{
        setNameTaken(false)
      }
      setProductInput({...productInput,productName : e.target.value })
    }
    else if(e.target.name == "productNameTamil"){
      if(productNames.some((val)=>val.productNameTamil.toLowerCase() == e.target.value.toLowerCase())){
        // alert("Already")
        setTamilNameTaken(true)
      }
      else{
        setTamilNameTaken(false)
      }
      setProductInput({...productInput,productNameTamil : e.target.value })
    }
    else if(e.target.name != "mark"){
      setProductInput({...productInput,[e.target.name] : e.target.value })
      // console.log({...productInput,[e.target.name] : e.target.value });
    }
    else{
      setProductInput({...productInput,mark:!productInput.mark})
    }
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    if(NameTaken){
      alert("Product Name is Already Taken!!")
    }
    else if(tamilNameTaken){
      alert("Product Name in Tamil is Already Taken!!")
    }
    else{
      try{
        let response = await axios.post(`${EndPoint}/productRegister`,productInput)
        console.log(response);
        setSuccessPopUp(true)
      } catch(err){
        console.error(err);
        setErrorPopUp(true)
      }
      productRegFun()
    }
  }

  return (
    <div>
      <div
        style={{
          fontWeight: "100",
          fontSize: "13px",
          color: "rgb(147, 147, 147)",
          cursor:"pointer",
          margin: "5px 0px 10px 0px"
        }}
      >
        {"Master"} <b>{">"}</b> {"Product Register"}{" "}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "85vh",
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        {
        successPopUp && <SuccessPopUp setState={setSuccessPopUp}/>
      }
      {
        errorPopUp && <CancelPopUp setState={setErrorPopUp}/>
      }
        {
          (isLoaded && success) ?
          <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paragraph
            style={{ fontSize: "18px", fontWeight: "bold" }}
            value={"Product Register"}
          />
        </div>
        <form onSubmit={onSubmitHandler}>
          <div>
            {ProductRegisterArr.map((val, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <FormTextBox
                  required={true}
                  inpStyle={{ minWidth: "300px" }}
                  Value={val.title}
                  inpValue={productInput[val.name]}
                  type={val.type}
                  name={val.name}
                  checked={productInput.mark}
                  onChange={val.name != "productId" ? onChangeHandler : ()=>{}}
                />
                {val.radio.length > 0 && (
                  <div style={{display:"flex",justifyContent:"center",gap:"8px"}}>
                    {val.radio.map((val,i) => (
                      <div key={i}>
                        <input required={true} type="radio" checked={productInput.quatityType == val} name={"prod-reg-radio"} value={val} id={val} onChange={(e)=>setProductInput({...productInput, quatityType:e.target.value})} />
                        <label style={{fontSize:"15px",fontWeight:"bold"}} htmlFor={val}>{val}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SubmitButton type={"submit"} style={{ width: "30vw", maxWidth: "310px" }} />
          </div>
        </form>
          </>
          : !isLoaded ? <h1>Loading Please Wait</h1> : <h1>Some Error Occurred</h1>
        }
      </div>
    </div>
  );
};

export default ProductRegisterComponent;
