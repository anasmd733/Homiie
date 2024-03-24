import React, { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routercom } from "./Common/Router/Routercom";
import Navbar from "./Common/Navbar/Navbar";
import CommonDashboard from "./Common/Dashboard/Dashboard";
import "./Style.css";
import ViewRegister from "./Page/ViewRegister/ViewRegister";

export const Contx = createContext();

export default function App() {
  const [loginPage, setLoginPage] = useState(false);
  return (
    <div>
      {/* <BrowserRouter>
        <Contx.Provider value={{ setLoginPage, loginPage }}>
          {!loginPage && <Navbar />}
          <div className="display">
            {!loginPage && (
              <div className="CommonDashboard">
                <CommonDashboard />
              </div>
            )}
            <div className={!loginPage ? "AllContent" : "TwoContent"}>
              <Routercom />
            </div>
          </div>
        </Contx.Provider>
      </BrowserRouter> */}
      {/* <EditProfile/> */}
      {/* <SaveProfile/> */}
      <ViewRegister/>
    </div>
  );
}
