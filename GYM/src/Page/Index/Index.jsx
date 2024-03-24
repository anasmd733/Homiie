import React from "react";
import "./Index.css";
import CommonButton from "../../Common/Button/Button";
import CommonPara from "../../Common/Para/Para";
import { RiFacebookCircleFill } from "react-icons/ri";
import { BsGoogle } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { RiWhatsappLine } from "react-icons/ri";
import { Contx } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { Path } from "../../Common/Router/Router";
const Index = () => {
  const { setLoginPage } = useContext(Contx);
  const Naviagte=useNavigate()
  useEffect(() => {
    setLoginPage(true);
  }, []);
  return (
    <div className="IndexConatiner">
      <div className="IndexId">
        <div className="whiteCircle"></div>
        <CommonPara label="Beast Forces" />
      </div>
      <div className="IndexTopCon">
        <div className="IndexContent">
          <CommonPara className="IndexTitle" label="Get Ready" />
          <CommonPara label="Shape your body" />
          <div className="IndexBigCon">
            <i>
              <CommonPara
                label="The harder you work and the more prepared you are for
              somthing.you're going to be able to persevere
              through anything"
              />
            </i>
          </div>
          <div className="IndexBtn">
            <CommonButton onClick={()=>Naviagte(Path.LogIn)} className="IndexButton" label="Get Start" />
          </div>
        </div>
      </div>

      <div className="IndexIcons">
        <CommonPara className="Icons" label={<RiFacebookCircleFill />} />
        <CommonPara className="Icons" label={<BsGoogle />} />
        <CommonPara className="Icons" label={<BsInstagram />} />
        <CommonPara className="Icons" label={<RiWhatsappLine />} />
      </div>
    </div>
  );
};

export default Index;
