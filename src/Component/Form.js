import React, { useState } from "react";
import Navbar from "./NavBar";
import "./form.css";
//import { Select, Input } from "antd";
const PriceList = () => {
  return (
    <div className="form_body">
      <h1>Price List</h1>
      <TestpageMookupData1 />
    </div>
  );
};

const TestpageMookupData1 = () => {
  const PriveCar = [
    {
      name: "Honda",
      model: [
        {
          name: "City",
        },
        {
          name: "Civic",
        },
      ],
    },
    {
      name: "toyota",
      model: [
        {
          name: "Yaris",
        },
        {
          name: "Cross",
        },
      ],
    },
    {
      name: "Bmw",
      model: [
        {
          name: "X7",
        },
        {
          name: "X8",
        },
      ],
    },
  ];
  const [pricecar, setpricecar] = useState(null);
  const [models, setmodels] = useState(null);
  const [model, setmodel] = useState([]);

  function handcar(event) {
    setpricecar(event.target.value);
    setmodel(PriveCar.find((e) => e.name === event.target.value).model);
    console.log(pricecar);
  }
  function handmodel(event) {
    setmodels(event.target.value);
    console.log(models);
    
  }
  return (
    <div>
      <div>
        เลือกยี่ห้อ
        <select onChange={handcar}>
          <option>เลือกยี่ห้อ</option>
          {PriveCar.map((e) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select>
        <div>
          เลือกรุ่น
          <select status="error" onChange={handmodel}>
            <option>เลือกรุ่น</option>
            {model.map((models) => (
              <option value={models.name}>{models.name}</option>
            ))}
          </select>
        </div>
      
        <button>ลองนะครับ</button>
      
        
      </div>
    </div>
  );
};

function Form() {
  return (
    <div>
      <Navbar />
      <PriceList />
    </div>
  );
}

export default Form;
