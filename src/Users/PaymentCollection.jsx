import React, { useEffect, useRef, useState } from 'react';
import PayTable from './PayTable';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAuth from "../Hooks/useAuth"

const PaymentCollection = () => {
    const { id} = useParams();
    const addPayment = useRef();
    const addCashPayment = useRef();
    const addCashDeposit = useRef();
    const addCashWithdraw = useRef();
    const addNote = useRef();
    const [calculation, setCalculation] = useState({});
    const [load, setLoad] = useState(false);
    const { name, mobileNumber, userSerialNo } = calculation;
    const {user}= useAuth();
    const collectiorName= user.displayName;
    useEffect(() => {
      const url = `https://sinhaenterprise.onrender.com/calculation/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setCalculation(data));
    }, []);
  
  
    // /////////////////
    const lastPaymentDate = () => {
      // Logic for updating last payment date based on customerType
      if (calculation?.customerType === "cash") {
        if (calculation?.installmentType === "weekly") {
          fetch(`https://sinhaenterprise.onrender.com/cashpaymentData/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Payment successfull");
              }
            });
        } else if (calculation?.installmentType === "monthly") {
          fetch(`https://sinhaenterprise.onrender.com/cashmonthlypaymentData/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Payment successfull");
              }
            });
        }
      } else if (calculation?.customerType === "product") {
        if (calculation?.installmentType === "weekly") {
          fetch(`https://sinhaenterprise.onrender.com/paymentData/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Payment successfull");
              }
            });
        } else if (calculation?.installmentType === "monthly") {
          fetch(`https://sinhaenterprise.onrender.com/monthlypaymentData/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Payment successfull");
              }
            });
        }
      }
    };
  
    ///////////////////////
  
    const date = new Date().toDateString();
  const payStatus = "paid";

  const cashSubmit = (e) => {
    e.preventDefault();
    const cashCollection = addCashPayment.current.value;
    const cashDeposit= addCashDeposit.current.value;
    const cashWithdraw= addCashWithdraw.current.value;
    const note= addNote.current.value;
    const PaymentInfo = {
      cashCollection,
      cashDeposit,
      cashWithdraw,
      date,
      id,
      name,
      payStatus,
      mobileNumber,
      collectiorName,
      userSerialNo,
      note
    };
    fetch("https://sinhaenterprise.onrender.com/cashpayment", {
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
      collectiorName,
      userSerialNo,
    };
    fetch("https://sinhaenterprise.onrender.com/payment", {
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
        addCashPayment={addCashPayment}
        addCashDeposit={addCashDeposit}
        addCashWithdraw={addCashWithdraw}
        paySubmit={paySubmit}
        cashSubmit={cashSubmit}
        addNote={addNote}
      />
        </>
    );
};

export default PaymentCollection;