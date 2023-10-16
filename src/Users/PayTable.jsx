import React from 'react';
import { useQuery } from 'react-query';
import ItemBox from '../Nav/ItemBox';
const PayTable = ({ calculation, load, addPayment, paySubmit}) => {
  const { _id, sellPrice, name, installmentType, mobileNumber,lastDateOfPayment,purchaseDate, primaryDeposit } = calculation;
  const dateCount= new Date().toLocaleDateString();
  console.log(dateCount)
  console.log(lastDateOfPayment)
  const url = `https://sinhaenterprise.onrender.com/allPayment?id=${_id}`;
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
  // const salePrice =  parseInt(purchasePrice ) + (parseInt(purchasePrice) * (parseInt(interestRate)/100));
  let totalPayAmount=0;
  for(const singlePayment of allPayment) {
    totalPayAmount += parseInt(singlePayment?.payment) ;
    console.log(totalPayAmount)
  }
  // console.log(totalPayAmount)
  let totalDeposite= 0;
  if(totalPayAmount){
    totalDeposite = totalPayAmount+parseInt(primaryDeposit);
  }
  // console.log("total deposite",totalDeposite)
  
let remaining= 0
 if(totalDeposite){
  remaining=  sellPrice - totalDeposite;
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
  const netAmount = sellPrice- primaryDeposit
  console.log(netAmount)
const week = parseInt(daysBetweenDates / 7);
console.log("Total", week, "week");

const month = parseInt(daysBetweenDates / 30);
console.log("Total Month", month, "month");

const installmentPerMonth = parseInt(netAmount / month);
console.log(installmentPerMonth);
const installmentPerWeek = parseInt(netAmount / week);
console.log(installmentPerWeek);
// Installment calculation using payment amount
// const calculateInstallmentWekly= allPayment?.payment / installmentPerWeek
// const calculateInstallmentMonth = allPayment?.payment / installmentPerMonth
  return (
    <>  
    <ItemBox/> 
 <div className="payboxes">
<div className="sallpricebox">
<h6>User: {calculation.name}</h6> 
<h6 className='ms-5'>User ID: {calculation.userSerialNo}</h6>  
  </div>
  <div className="paymentOption">
  <h6 >Sale Value: {sellPrice}</h6> 
    <h6 className='ms-5'>DownPayment: {primaryDeposit}</h6>
    </div> 
   <div className="serialInfo">
   <h6>After DownPayment: {sellPrice-primaryDeposit}</h6>  
    <h6 className='ms-5'>Remaining Due: {remaining} </h6>  
   </div>
   <div className="installMent">
   <h6>Installment Type: { installmentType} </h6>   
         <h6 className='ms-5'>Installment Amount</h6>
          {installmentType === "monthly" ? (
          
            <h6 className="">:{installmentPerMonth}Tk</h6>
          ) : (
            <h6 className="">:{installmentPerWeek} Tk</h6>
          )}
   </div>
   <div className="remainingInstall">
   <h6>Total</h6>
          {installmentType === "monthly" ? (
            <h6 className="">:{month}</h6>
          ) : (
            <h6 className="">:{week}</h6>
          )}
           <h6 className='ms-5'>Remaining</h6>
          {installmentType === "monthly" ? (
            <h6 className="">:{month-allPayment.length}</h6>
          ) : (
            <h6 className="">:{week-allPayment.length}</h6>
          )}
   </div>
         
 </div>
    <div className="showingUL">
    <table className="">
        <thead>
          <tr className="">
            <th className="">SL No</th>
          <th>Payment Date</th>
            <th>Pay Amount</th>
            <th>Collected By</th>
      <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPayment?.map((pay, index) => (
            <tr className="hover" key={pay._id}>
              <th>{index + 1}</th>
            <td>{pay?.date}</td>
              <td>{pay?.payment}</td> 
              <td>{pay?.collectiorName}</td> 
        
              {/* {admin && <button className="EDIT"><td><i className="fa-solid fa-pen-to-square"></i></td> </button>} */}
             
            </tr>
          ))}
        </tbody>
      </table>
      {
        // totalDeposite>=sellPrice ?
        // <>
        // <p>Your All Payment is completed</p>
        // <button className="mb-2">Reset Data</button>
        // </>
        // :
        <>
        <form onSubmit={paySubmit} >
                <div className="paymentDiv">
                <input type="text" name="" className="payInput" id="" placeholder='Make Payment' ref={addPayment} required/>
                <br />
                <input className="paymentBTN" type='submit' value="Pay" name='Pay'/>
                </div>
            </form>
            {/* <div className="downloads mt-5 mb-5">
  <div className="downloadHistory">
  {admin && 
   <PDFDownloadLink
   document={<PdfCalculation calculation={calculation} />}
   filename="FORMS"
 >
   {({ loading }) =>
     loading ? (
       <button>Loading Document...</button>
     ) : (
       <button className="downloadButton">Download Payment History</button>
     )
   }
 </PDFDownloadLink>
  }
  </div>
  <div className="backButton">
  <button className="paymentBTN"><Link className="backlink" to="/sidebar/users">Back</Link></button>
  </div>
</div> */}
        </>
      }
    </div>
     
      
      
    </>
  );
};

export default PayTable;