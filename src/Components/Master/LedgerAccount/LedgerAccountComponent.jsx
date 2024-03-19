import React, { useEffect, useState } from "react";
import { CustomerAccArr, SupplierAccArr } from "./LedgerAccountInputArray";
import FormTextBox from "../../../Common/FormCard/FormTextBox";
import { Col, Container, Row } from "react-bootstrap";
import TextArea from "../TextArea";
import { MenuItem, Select } from "@mui/material";
import { isValidElement } from "react";
import SubmitButton from "../../../Common/Submit/SubmitButton";
import Paragraph from "../../../Common/Paragraph/Paragraph";
import { Troubleshoot } from "@mui/icons-material";
import axios from "axios";
import SuccessPopUp from "../../PopUp/SuccessPopUp";
import CancelPopUp from "../../PopUp/CancelPopUp";
import { EndPoint } from "../../../EndPoints/EndPoint";

const LedgerAccountComponent = () => {
  const [selected, setSelected] = useState("Customer")
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState({customer : false,supplier : false})
  const [successPopUp, setSuccessPopUp] = useState(false)
  const [errorPopUp, setErrorPopUp] = useState(false)
  const [customerNames, setCustomerNames] = useState([])
  const [supplierNames, setSupplierNames] = useState([])

  const [NameTaken, setNameTaken] = useState(false)
  const [tamilNameTaken, setTamilNameTaken] = useState(false)

  const [customer, setCustomer] = useState(
    {
      id : 0,
      CustomerId : 0,
      customerName :"",
      nameInTamil : "",
      ledgerType : selected,
      openingBalance : 0,
      address : "",
      whatsappNo : "",
      smsNo : ""
    }
  )
  const [supplier, setSupplier] = useState(
    {
      id : 0,
      purchaseId : 0,
      supplierName :"",
      nameInTamil : "",
      ledgerType : selected,
      openingBalance : 0,
      address : "",
      whatsappNo : "",
      smsNo : ""
    }
  )

  const customerFun = async ()=>{
    try{
      let sale = (await axios.get(`${EndPoint}/ledgerCustomer`)).data
      const Names = sale.map((val)=>(
      {"customerName" : val.customerName,
       "nameInTamil" : val.nameInTamil
      }))
      setCustomerNames(Names)
      const saleId = sale[sale.length-1].CustomerId+1
      const customerId = sale[sale.length-1].id+1
      setCustomer({
        id : customerId,
        ledgerType : selected,
        customerName :"",
        nameInTamil : "",
        CustomerId : saleId,
        openingBalance : 0,
        address : "",
        whatsappNo : "",
        smsNo : ""
      })
      // console.log(sale);
      setSuccess(prevSuccess => ({ ...prevSuccess, customer: true }));
    } catch(err){
      console.error(err);
      setSuccess(prevSuccess => ({ ...prevSuccess, customer: false }));
    }
  }
  
  const supplierFun = async ()=>{
    try{
      let purc = (await axios.get(`${EndPoint}/ledgerSupplier`)).data
      const Names = purc.map(val=>(
        {
          "supplierName" : val.supplierName,
          "nameInTamil" : val.nameInTamil
        }
      ))
      setSupplierNames(Names)
      const purId = purc[purc.length-1].purchaseId+1
      const supplierId = purc[purc.length-1].id+1
      setSupplier({
        id : supplierId,
        ledgerType : selected,
        supplierName :"",
        nameInTamil : "",
        purchaseId : purId,
        openingBalance : 0,
        address : "",
        whatsappNo : "",
        smsNo : ""
      })
      // console.log(purc);
      setSuccess(prevSuccess => ({ ...prevSuccess, supplier: true }));
    } catch(err){
      console.error(err);
      setSuccess(prevSuccess => ({ ...prevSuccess, supplier: false }));
    }
  }

  useEffect(()=>{
    const openingFun = async()=>{
      await customerFun()
      await supplierFun()
      setIsLoaded(true)
    }
    openingFun()
  },[selected])

  const onCustomerChange = (e)=>{
    if(e.target.name == "customerName"){
      if(customerNames.some((val)=>val.customerName.toLowerCase() == e.target.value.toLowerCase())){
        setNameTaken(true)
      }
      else{
        setNameTaken(false)
      }
    }
    else if(e.target.name == "nameInTamil"){
      if(customerNames.some((val)=>val.nameInTamil.toLowerCase() == e.target.value.toLowerCase())){
        setTamilNameTaken(true)
      }
      else{
        setTamilNameTaken(false)
      }
    }
    else if(e.target.name == "openingBalance"){
      setCustomer({...customer,ledgerType:selected,[e.target.name]:String(Number(e.target.value))})
      return
    }
    setCustomer({...customer,ledgerType:selected,[e.target.name]:e.target.value})
  }

  const supplierOnchange = (e)=>{
    if(e.target.name == "supplierName"){
      if(supplierNames.some((val)=>val.supplierName.toLowerCase() == e.target.value.toLowerCase())){
        setNameTaken(true)
      }
      else{
        setNameTaken(false)
      }
    }
    else if(e.target.name == "nameInTamil"){
      if(supplierNames.some((val)=>val.nameInTamil.toLowerCase() == e.target.value.toLowerCase())){
        setTamilNameTaken(true)
      }
      else{
        setTamilNameTaken(false)
      }
    }
    else if(e.target.name == "openingBalance"){
      setSupplier({...supplier,ledgerType:selected,[e.target.name]:String(Number(e.target.value))})
      return
    }
    setSupplier({...supplier,ledgerType:selected,[e.target.name]:e.target.value});
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    if(NameTaken){
      alert("UserName is Already Taken!!!")
    }
    else if(tamilNameTaken){
      alert("UserName in Tamil is Already Taken!!")
    }
    else{
      try{
        if(selected == "Customer"){
          let cust = customer;
          delete cust.ledgerType;
          // console.log(cust);
          // console.log(customer);
          const response = await axios.post(`${EndPoint}/ledgerCustomer`,cust)
          console.log(response);
          // successPopUp(true)
        }
        else{
          let supp = supplier;
          delete supplier.ledgerType;
          const response = await axios.post(`${EndPoint}/ledgerSupplier`,supp)
          console.log(response);
        }
        setSuccessPopUp(true)
      } catch(err){
        console.error(err)
        setErrorPopUp(true)
      }
      customerFun()
      supplierFun()
    }
    // axios.post()
  }

  return (
    <div style={{minHeight:"90vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
      {
        successPopUp && <SuccessPopUp setState={setSuccessPopUp}/>
      }
      {
        errorPopUp && <CancelPopUp setState={setErrorPopUp}/>
      }
      <div>
      {
        (isLoaded && success.customer && success.supplier) ?
        <form onSubmit={onSubmitHandler}>
      <Container>
        <div style={{display:"flex",flexDirection:"column",minHeight:"80vh",justifyContent:"space-between"}}>
          <div className="leadgerhead" style={{height:"10vh"}}>
            <Paragraph value={"Ledger Account Creation"} style={{color:"#333A44",textAlign:"center",fontSize:"18px",fontWeight:"550"}}/>
          </div>
        <Row>
          {selected == "Customer"
            ? CustomerAccArr.map((val,i) =>
                val.type == "textarea" ? (
                  <Col key={i} sm={12} md={12} lg={6} xl={6}>
                    <FormTextBox
                      inpStyle={{
                        height: "200px",
                        textAlign: "top",
                      }}
                      inpValue={customer[val.name]}
                      options={val.options}
                      Value={val.title}
                      type={val.type}
                      required={true}
                      name={val.name}
                      onChange={onCustomerChange}
                    />
                  </Col>
                ) : val.type=="select" ? (
                  <Col key={i} sm={12} md={12} lg={6} xl={6}>
                    <FormTextBox name={val.name} onChange={(e)=>setSelected(e.target.value)} options={val.options} inpValue={customer[val.name]} Value={val.title} selectValue={selected} type={val.type} />
                  </Col>
                ) : (
                  <Col key={i} sm={12} md={12} lg={6} xl={6}>
                    <FormTextBox name={val.name} options={val.options} Value={val.title} type={val.type} onChange={val.name != "CustomerId" ? onCustomerChange : ()=>{}} inpValue={customer[val.name]} required={Troubleshoot} />
                  </Col>
                )
              )
             : SupplierAccArr.map((val,i) =>
              val.type == "textarea" ? (
                <Col key={i} sm={12} md={12} lg={6} xl={6}>
                  <FormTextBox
                    inpStyle={{
                      height: "200px",
                      display: "flex",
                      alignItems: "start",
                    }}
                    type={val.type}
                    options={val.options}
                    Value={val.title}
                    onChange={supplierOnchange}
                    name={val.name}
                    inpValue={supplier[val.name]}
                    required={true}
                  />
                </Col>
              ) : val.type=="select" ? (
                <Col key={i} sm={12} md={12} lg={6} xl={6}>
                  <FormTextBox onChange={(e)=>setSelected(e.target.value)} options={val.options} Value={val.title} selectValue={selected} type={val.type} name={val.name} inpValue={supplier[val.name]} />
                </Col>
            ) : (
              <Col key={i} sm={12} md={12} lg={6} xl={6}>
                <FormTextBox options={val.options} Value={val.title} type={val.type} name={val.name} onChange={val.name != "purchaseId" ? supplierOnchange : ()=>{}} inpValue={supplier[val.name]} required={true} />
              </Col>
            )
          )}
        </Row>
        <div style={{display:"flex",justifyContent:"center"}}>
            <button style={{border:"1px solid #EAC96B",backgroundColor:"#EAC96B",color:"white",padding:"5px 10px",width:"35%",borderRadius:"5px"}} type="submit">Submit</button>
        </div>
        </div>
      </Container>
      </form>
       : !isLoaded ? <h1>Loading Wait!!!</h1> : <h1>Some Error Occurred!!!.<br/> Check Your Internet Connection</h1>
      }
      </div>
    </div>
  );
};

export default LedgerAccountComponent;