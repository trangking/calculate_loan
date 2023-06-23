import Navbar from "./NavBar";
import { Select, Input, Form, Checkbox, Button, InputNumber, Card } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import axios from "axios";
import { DatePicker, Space } from "antd";
import "./DropDrown.css";
import Item from "antd/es/list/Item";
import { parse } from "uuid";

const Database = () => {
  const [typecar, settypercar] = useState([]);
  const [typecarcode, settypecarcode] = useState("");
  const [brand, setbrand] = useState([]);
  const [model, setmodel] = useState([]);
  const [caryear, setcaryear] = useState([]);
  const [modeldetail, setmodeldetail] = useState([]);
  const [modelname, setmodelname] = useState("");
  const [price, setprice] = useState([]);
  const [caryears, setcaryears] = useState("");
  const [modelCode, setModecode] = useState("");
  const [persLeasing, setpersLeasing] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [form] = Form.useForm();
  const [needMoney, setneedMoney] = useState(0);
  const [interestrate, setinterestrate] = useState("");
  const [listAmount, setlistAmount] = useState([]);
  const [dateDayAmount, setdateDayAmount] = useState("");

  const fecthData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/typecar");
      settypercar(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangetypecar = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/brand?CAR_TYPE_CODE=${value}`
      );
      settypecarcode(value);
      setbrand(data.data.resultElements);
    } catch (err) {
      console.log(err);
    }
    // console.log(value);
  };
  const onChangebrand = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/brand?CAR_TYPE_CODE=${typecarcode}&&BN_CODE=${value}`
      );
      setmodel(data.data.resultElements2);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangemodel = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/year?MD_NAME=${value} `
      );
      setcaryear(data.data);
      setmodelname(value);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangecaryear = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/Model_detail?MD_NAME=${modelname}&&CAR_YEAR=${value} `
      );
      setmodeldetail(data.data);
      setcaryears(value);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangemodeldetail = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/price?MDDT_CODE=${value}&&CAR_YEAR=${caryears}`
      );
      //เก็บ data ใน arrTotal
      const { arrTotal } = response.data;

      setprice(arrTotal);

      form.setFieldsValue({
        Select2: "",
        "exmple-price": arrTotal.PRICE,
        "manageable-amount": arrTotal.total,
      });

      console.log(arrTotal);
    } catch (error) {
      console.log(error);
    }
  };
  // const onChangemodeldetail = async (value) => {
  //   try {
  //     const data = await axios.get(
  //       `http://localhost:3001/price?MDDT_CODE=${value}&&CAR_YEAR=${caryears}`
  //     );
  //     setprice(data.data.arrTotal);
  //     console.log(data.data.arrTotal);
  //     form.setFieldsValue({
  //       Select2: "",
  //       "exmple-price": data.data.arrTotal.PRICE,
  //       "manageable-amount": data.data.arrTotal.total,
  //     });

  //     console.log(data.data.arrTotal);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const onChangeprice = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/persLeasing?MDDT_CODE=${value}&&CAR_YEAR=${caryears}`
      );

      setpersLeasing(data.data);
      console.log(data.data.PERS_LEASING);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangeneedmoney = (value) => {
    setneedMoney(value);
  };
  const onChangeinterestrate = (value) => {
    setinterestrate(value);
  };
  const onChangedate = (date, dateString) => {
    setdateDayAmount(dateString);
  };
  const installmentPayment = [
    {
      installmentPayment: 12,
    },
    {
      installmentPayment: 18,
    },
  ];

  const sentToBackend = async () => {
    const convertArr = (exmpleprice) => {
      const exmplepriceInt = exmpleprice.split(" ");
      const exmple = exmplepriceInt[2].replace(/,/g, "");
      return parseFloat(exmple);
    };
    try {
      const requestData = {
        exmpleprice: convertArr(price.PRICE),
        principalAmount: parseFloat(needMoney),
        desiredAmount: parseInt(price.total),
        interestrate: parseFloat(interestrate),
        installmentPayment: parseInt(installmentPayment[0].installmentPayment),
        dateDayAmount: dateDayAmount,
      };

      const res = await axios.post(
        "http://localhost:3001/principalAmount",
        requestData
      );
      setlistAmount(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    sentToBackend();
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  useEffect(() => {
    fecthData();
  }, []);

  useEffect(() => {
    // const test = "installmentPayment";
    // console.log(installmentPayment[0]);
    // console.log(installmentPayment[0].installmentPayment);
    // console.log(installmentPayment[0][`${test}`]);
    console.log(listAmount);
  }, [listAmount]);

  useEffect(() => {
    console.log(dateDayAmount);
  }, [dateDayAmount]);
  return (
    <Form form={form} name="control-hooks">
      <Form.Item label="ประเภทรถ" name="type-car">
        <Select
          showSearch
          style={{ width: 277 }}
          placeholder="เลือกประเภทรถ"
          onChange={onChangetypecar}
        >
          {typecar.map((item, index) => (
            <Select.Option value={item.CAR_TYPE_CODE} key={index}>
              {item.CAR_TYPE_NAME}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div>
        <Form.Item label="ยี่ห้อ" name="brand">
          <Select
            showSearch
            style={{ width: 277 }}
            placeholder="เลือกยี่ห้อรถ"
            onChange={onChangebrand}
          >
            {brand.map((item, index) => (
              <Select.Option value={item.BN_CODE} key={index}>
                {item.BN_NAME}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item label="รุ่นรถ" name="mode-car">
          <Select
            showSearch
            style={{ width: 277 }}
            placeholder="เลือกรุ่นรถ"
            onChange={onChangemodel}
          >
            {model.map((item, index) => (
              <Select.Option value={item.MD_NAME} key={index}>
                {item.MD_NAME}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item label="ปีรถ(พ.ศ.)" name="year">
          <Select
            showSearch
            style={{ width: 277 }}
            placeholder="เลือกปีรถ"
            onChange={onChangecaryear}
          >
            {caryear.map((item, index) => (
              <Select.Option value={item.CAR_YEAR} key={index}>
                {item.CAR_YEAR}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item label="โฉม" name="model-detail">
          <Select
            showSearch
            style={{ width: 277 }}
            placeholder="เลือกโฉมรถ"
            onChange={onChangemodeldetail}
          >
            {modeldetail.map((item, index) => (
              <Select.Option value={item.MDDT_CODE} key={index}>
                {item.MDDT_NAME}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item label="ราคากลาง" name="exmple-price">
          <Input
            value={price.PRICE}
            onChange={onChangeprice}
            style={{ width: 277 }}
            suffix="บาท"
            disabled
          />
        </Form.Item>
      </div>
      <div>
        <Form.Item label="ยอดที่จัดได้" name="manageable-amount">
          <InputNumber
            value={price.total}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: 277 }}
            suffix="บาท"
            disabled
          />
        </Form.Item>
      </div>
      <div>
        <Form.Item label="วงเงินที่ต้องการ" name="need-money">
          <InputNumber
            value={needMoney}
            onChange={onChangeneedmoney}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            className="ant-input-suffix1"
            style={{ width: 277 }}
            suffix="บาท"
          />
        </Form.Item>
      </div>

      <Form.Item label="ดอกเบี้ย" name="ดอกเบี้ย">
        <Select
          value={interestrate}
          className="money"
          style={{ width: 150 }}
          placeholder="เลือกดอกเบี้ย"
          options={[
            { value: 14, label: "14%" },
            { value: 20, label: "20%" },
          ]}
          onChange={onChangeinterestrate}
        ></Select>
      </Form.Item>
      <div>
        <Form.Item label="เลือกวันที่จะชำระเงิน" name="date">
          <DatePicker onChange={onChangedate} />
        </Form.Item>
      </div>
      <div>
        <Form.Item>
          <Button
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
            className="buttoncal"
            style={{ width: 180 }}
            type="primary"
          >
            คำนวณ
          </Button>
        </Form.Item>
      </div>
      <Form.Item>
        {listAmount.map((item, index) => (
          <Card
            title="Test Card"
            style={{
              width: 500,
            }}
            key={index}
          >
            <p>ยอดที่จัดได้{item.desiredAmount}</p>
            <p>จำนวนที่ต้องการกู้{item.principalAmount}</p>
            <p>ค่างวด{item.total}</p>
            <p>ระยะเวลา{item.installmentPayment}</p>
            <p>ดอกเบี้ย%ต่อปี{item.interestrate}</p>
          </Card>
        ))}
      </Form.Item>
    </Form>
  );
};

function DatabasPricelist() {
  return (
    <>
      <Navbar />
      <Database />
    </>
  );
}

export default DatabasPricelist;
