import React, { useState } from "react";
import { Contx } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import "./Home.css";
import HomeBtns from "../../Components/HomeBtns/HomeBtns";
import ExpiredAc from "../../Components/ExpiredAc/ExpiredAc";
import ExpireIn3 from "../../Components/ExpireIn3/ExpireIn3";
import Renewelpop from "../../Components/Renewelpop/Renewelpop";
import RenewalForm from "../../Components/RenewalForm/RenewalForm";
const Home = () => {
  const [Expire, setExpire] = useState(false);
  const { setLoginPage } = useContext(Contx);
  const [Tableswap, setTablwswap] = useState(false);
  const [renewel, setrenewel] = useState(false);
  const[RForm,setRForm]=useState(false)
  const Naviagte = useNavigate();
  useEffect(() => {
    setLoginPage(false);
  }, []);
  const HandleEx3 = () => {
    setTablwswap(false);
  };

  const ExpireTable = () => {
    setTablwswap(true);
  };

  const Renewelpopup = () => {
    setrenewel(!renewel);
    setRForm(false)
  };

  const Handletrue =()=>{
    setRForm(true)
    setrenewel(false);
  }
  const RenewalFormBack=()=>{
    setRForm(false)
  }

  return (
    <div className="Homepage">
      <div style={{ width: "95%", opacity: renewel ? "0.2" : "1" }}>
        <HomeBtns HadleExpireTable={ExpireTable} HandleEx3={HandleEx3} />
        <div style={{ width: "100%" }}>
          {Tableswap ? <ExpiredAc Handelrenewel={Renewelpopup} /> : <ExpireIn3 HandleRenewel={Renewelpopup} />}
        </div>
      </div>
      {Expire && (
        <div className="ExpiredAc">
          <ExpiredAc handleBack={ExpiredAccount} />
        </div>
      )}

      {renewel && <div className="Renewelpopup"> <Renewelpop popupCon='Are you sure want to renewal ?' True='Sure' False='Cancel' HandleTrue={Handletrue} HandlepopBack={Renewelpopup}/></div> }

      {RForm && <div className="Renewelpopup"><RenewalForm RenewalFormBack={RenewalFormBack}/></div>}
    </div>
  );
};

export default Home;
