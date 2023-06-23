import "./App.css";
import Navbar from "./Component/NavBar";
import React from "react";
//router
import { useNavigate } from "react-router-dom";



const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="container">
      <div>
        <p>คำนวณสินเชื่อ</p>
        <p className="P1">HENG LEASING</p>
        <p className="p_2">รูปแบบรายการคำขอสินเชื่อ</p>
        <div>
      <div>
          
          <button 
            size="large" className="buttonHP"
            onClick={() => navigate("/TestDropDrown")}
          >
            Hire Purchase(HP)
          </button>
          <button
            className="buttonP-loan"
            onClick={() => navigate("/TestDropDrown")}
          >
            P-Loan
          </button>
        </div>
     
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      
    </div>
  );
}

export default App;
