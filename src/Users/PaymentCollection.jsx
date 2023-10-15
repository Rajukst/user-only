import React, { useEffect, useRef, useState } from 'react';
import PayTable from './PayTable';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const PaymentCollection = () => {
    const { id} = useParams();
    const addPayment = useRef();
    const [calculation, setCalculation] = useState({});
    const [load, setLoad] = useState(false);
    const { name, mobileNumber } = calculation;
    // const {user}= useAuth();
    // const collectiorName= user.displayName;
    useEffect(() => {
      const url = `https://asadtelecom.onrender.com/calculation/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setCalculation(data));
    }, []);
  
    // /////////////////
  
    const lastPaymentDate = () => {
      fetch(`https://asadtelecom.onrender.com/paymentData/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //    console.log(data)
          if (data.acknowledged) {
            toast.success("Payment successfull");
          }
        });
    };
  
    ///////////////////////
  
    const date = new Date().toDateString();
    const payStatus = "paid";
    const paySubmit = (e) => {
      e.preventDefault();
      const payment = addPayment.current.value;
      const PaymentInfo = {
        payment,
        date,
        id,
        name,
        payStatus,
        mobileNumber,
        // collectiorName,
      };
      fetch("https://asadtelecom.onrender.com/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(PaymentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            lastPaymentDate();
            e.target.reset();
            setLoad(!load);
          }
          console.log(data);
        });
    };
    return (
      <>
      <PayTable
        calculation={calculation}
        load={load}
        addPayment={addPayment}
        paySubmit={paySubmit}
      />  
  
        </>
    );
};

export default PaymentCollection;