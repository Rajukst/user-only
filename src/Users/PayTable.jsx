import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ItemBox from '../Nav/ItemBox';

const PayTable = ({calculation, load, addPayment, paySubmit}) => {
    const { _id, interestRate,purchasePrice, name,installmentType, mobileNumber,lastDateOfPayment,purchaseDate, primaryDeposit } = calculation;
    const url = `https://asadtelecom.onrender.com/allPayment?id=${_id}`;
    const {
      data: allPayment = [],
      // isLoading,
    } = useQuery({
      queryKey: ["allPayment", _id, name, mobileNumber, load],
      queryFn: async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });
  
    const salePrice =  parseInt(purchasePrice ) + (parseInt(purchasePrice) * (parseInt(interestRate)/100));
  
    let totalPayAmount=0;
    for(const singlePayment of allPayment) {
      totalPayAmount += parseInt(singlePayment?.payment) ;
    }
    // console.log(totalPayAmount)
    let totalDeposite= 0;
    if(totalPayAmount){
      totalDeposite = totalPayAmount+parseInt(primaryDeposit);
    }
    // console.log("total deposite",totalDeposite)
  
  let remaining= 0
   if(totalDeposite){
    remaining=  salePrice - totalDeposite;
   }
  // days calculations
  const startDateInMilliseconds = new Date(purchaseDate).getTime();
  const endDateInMilliseconds = new Date(lastDateOfPayment).getTime();
  const timeDifferenceInMilliseconds =
    endDateInMilliseconds - startDateInMilliseconds;
  //getting day
  const daysBetweenDates = Math.ceil(
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  
  console.log(daysBetweenDates); // consoling the actual days

  const week = parseInt(daysBetweenDates / 7);
  console.log("Total", week, "week");

  const month = parseInt(daysBetweenDates / 30);
  console.log("Total Month", month, "month");

  const installmentPerMonth = parseInt(salePrice / month);
  console.log(installmentPerMonth);
  const installmentPerWeek = parseInt(salePrice / week);
  console.log(installmentPerWeek);
    return (
      <>
      <ItemBox/>   
      <div className="usrInfo"> 
<h5 className='userNM'>User Name: {calculation.name}</h5>     
<h5 className='saleValue'>Sale Value: {salePrice}</h5>  
<h6 className='UsrId'>User ID: {calculation._id}</h6>  
<h6 className='remaingDue'>Remaining Due: {remaining} </h6>   
<div className="FlexProfess">
     <h6 className='perInstall'>Per Installment Amount:
     
      {installmentType === "monthly" ? (
        <h6 className="ps-3 installMonth">{installmentPerMonth}Tk</h6>
      ) : (
        <h6 className="ps-3">{installmentPerWeek} Tk</h6>
      )}
      </h6>
    </div>
    </div>
    <table className="payTble">
    <thead>
      <tr className="">
        <th className="">SL No</th>
        <th className="">Name</th>
        <th>Pay Amount</th>
      </tr>
    </thead>
    <tbody>
      {allPayment?.map((pay, index) => (
        <tr className="hover" key={pay._id}>
          <th>{index + 1}</th>
          <td>{pay?.name}</td> 
          <td>{pay?.payment}</td> 
          {/* {admin && <button className="EDIT"><td><i className="fa-solid fa-pen-to-square"></i></td> </button>} */}
         
        </tr>
      ))}
    </tbody>
  </table>
  {
    totalDeposite>=salePrice ?
    <>
    <p>Your All Payment is completed</p>
    <button className="mb-2">Reset Data</button>
    </>
    :
    <>
    <form onSubmit={paySubmit} >
            <div className="paymentDiv">
            <input type="text" name="" className="payInput" id="" placeholder='Make Payment' ref={addPayment} required/>
            <br />
            <input className="paymentBTN" type='submit' value="Pay" name='Pay'/>
            </div>
        </form>
        <Link to="/products"><button className="backButton">Back</button></Link>
    </>
  } 
       </>
    );
};

export default PayTable;
/*




*/