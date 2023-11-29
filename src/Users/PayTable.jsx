import React,{useState} from 'react';
import { useQuery } from 'react-query';
import ItemBox from '../Nav/ItemBox';
const PayTable = ({ calculation, load, addPayment,addNote, paySubmit,addCashPayment,addCashDeposit,addCashWithdraw,cashSubmit }) => {
  const {
    _id,
    sellPrice,
    name,
    customerType,
    installmentType,
    mobileNumber,
    lastDateOfPayment,
    purchaseDate,
    primaryDeposit,
    userSerialNo,
    image
  } = calculation;
  const dateCount = new Date().toLocaleDateString();
  const [collect, setCollect] = useState([]);
  // console.log(dateCount);
  // console.log(lastDateOfPayment);
  // console.log(_id);

  const url =
    customerType === 'cash'
      ? `https://sinhaenterprise.onrender.com/cashallPayment?id=${_id}`
      : `https://sinhaenterprise.onrender.com/allPayment?id=${_id}`;

  const { data: paymentData = [], refetch } = useQuery({
    queryKey: ['allPayment', _id, name, mobileNumber, load],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      refetch(data);
      return data;
    },
  });
  const { data: cashPaymentData=[] } = useQuery({
    queryKey: ['cashallPayment', _id, name, mobileNumber, load],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  console.log(cashPaymentData);
  console.log(paymentData);
  let totalPayAmount = 0;
  for (const singlePayment of paymentData) {
    totalPayAmount += parseInt(singlePayment?.payment);
    // console.log(totalPayAmount);
  }
  let totalDeposite = 0;
  if (totalPayAmount) {
    totalDeposite = totalPayAmount + parseInt(primaryDeposit);
  }

  let remaining = 0;
  if (totalDeposite) {
    remaining = sellPrice - totalDeposite;
  }

  let totalCashCollection = 0;
  for (const cashCollections of cashPaymentData){
    totalCashCollection+=parseInt(cashCollections?.cashCollection)
    
  }
  console.log("total Cash",totalCashCollection);
  let totalDepositCollection = 0;
  for (const cashCollections of cashPaymentData){
    totalDepositCollection+=parseInt(cashCollections?.cashDeposit) 
  }
  // let finalDepositCollection = parseInt(totalDepositCollection+primaryDeposit)
  const finalDepositCollection = parseInt(primaryDeposit)+parseInt(totalDepositCollection)
// console.log(finalDepositCollection)
  // console.log("total Deposit", typeof(finalDepositCollection), finalDepositCollection);

  let totalWithdraw = 0;
  for (const cashCollections of cashPaymentData){
    totalWithdraw+=parseInt(cashCollections?.cashWithdraw)
    
  }
  console.log("total Withdraw",totalWithdraw);
let remainingDeposit = parseInt(finalDepositCollection)-parseInt(totalWithdraw)

// let countWithOutDeposit= parseInt()
// console.log(countWithOutDeposit)
let countWithOutDeposit = parseInt(sellPrice)-(parseInt(totalCashCollection))
console.log(countWithOutDeposit)

  const startDateInMilliseconds = new Date(purchaseDate).getTime();
  const endDateInMilliseconds = new Date(lastDateOfPayment).getTime();
  const timeDifferenceInMilliseconds =
    endDateInMilliseconds - startDateInMilliseconds;

  const daysBetweenDates = Math.ceil(
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  // console.log(daysBetweenDates);
  const netAmount = sellPrice - primaryDeposit;
  // console.log(netAmount);
  const week = parseInt(daysBetweenDates / 7);
  // console.log('Total', week, 'week');

  const month = parseInt(daysBetweenDates / 30);
  // console.log('Total Month', month, 'month');

  const installmentPerMonth = parseInt(netAmount / month);
  // console.log(installmentPerMonth);
  const installmentPerWeek = parseInt(netAmount / week);
  // console.log(installmentPerWeek);

  const handleDeletePayment = (paymentId) => {
    if(customerType==="cash"){
      const permissionDelete = window.confirm(
        'Are you sure you want to delete this Payment?'
      );
      if (permissionDelete) {
        const deleteUrl = `https://sinhaenterprise.onrender.com/cashdetaCollectionallPayment/${paymentId}`;
        fetch(deleteUrl, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              alert('Payment deleted');
              const updatedPayments = paymentData.filter(
                (payment) => payment._id !== paymentId
              );
              setCollect(updatedPayments);
            }
          })
          .catch((error) => {
            console.error('Error deleting payment:', error);
          });
      }
    }
    else{
      const permissionDelete = window.confirm(
        'Are you sure you want to delete this Payment?'
      );
      if (permissionDelete) {
        const deleteUrl = `https://sinhaenterprise.onrender.com/detaCollectionallPayment/${paymentId}`;
  
        fetch(deleteUrl, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              alert('Payment deleted');
              const updatedPayments = paymentData.filter(
                (payment) => payment._id !== paymentId
              );
              setCollect(updatedPayments);
            }
          })
          .catch((error) => {
            console.error('Error deleting payment:', error);
          });
      }
    }
  };
  return (
    <>  
    <ItemBox/> 
 <div className="payboxes">
 {customerType=="cash" ?  
     <>
      <div className='mainDV'>
      <div className="nameComp">
      <h6>User Name: {name}</h6>
       <h6>User ID: {userSerialNo}</h6>
      </div>
      <div className="cashInfo">
      <h6>Cash Given: {sellPrice}</h6>
      <h6>Remaining Cash: {countWithOutDeposit}</h6>
      </div>
   <div className="deposCon">
   <h6>Cash Collection: {totalCashCollection}</h6>
     <h6>Deposit Collection: {finalDepositCollection}</h6>
   </div>
     <div className="Remainings">
     <h6>Cash Withdraw: {totalWithdraw}</h6>
     <h6>Remaining Deposit: {remainingDeposit}</h6>
     </div>
    <div className="myOposn">
      <div className="abcNols">
        <h6>Per Installment Amount</h6>
        {installmentType === 'monthly' ? (
          <h6 className="ps-3">{installmentPerMonth}Tk</h6>
        ) : (
          <h6 className="ps-3">{installmentPerWeek} Tk</h6>
        )}
      </div>
      <div className="infoInsall">
          <h6>Total Installment</h6>
          {installmentType === 'monthly' ? (
            <h6 className="ps-3">{month}</h6>
          ) : (
            <h6 className="ps-3">{week}</h6>
          )}
        </div>
    </div>
      <div className="installInfo">
        <div className="infoInsall">
          <h6>Remaining Installment</h6>
          {installmentType === 'monthly' ? (
            <h6 className="ps-3">{month - cashPaymentData.length}</h6>
          ) : (
            <h6 className="ps-3">{week - cashPaymentData.length}</h6>
          )}
        </div>
        <img className='userImg'  src={image} alt="" />
      </div>
      </div>
     </>
     : 
     <>
     <div className="sallpricebox">
<h6>User: {calculation.name}</h6> 
<h6 className='ms-5'>User ID: {calculation.userSerialNo}</h6>  
  </div> 
   <div className="serialInfo">
   <h6>After DownPayment: {sellPrice-primaryDeposit}</h6>  
    <h6 className='ms-5'>Due Amnt: {remaining} </h6>  
   </div>
   <div className="installMent">
   <h6>Installment Type: { installmentType} </h6>   
         <h6 className='ms-5'>Amount</h6>
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
            <h6 className="">:{month-paymentData.length}</h6>
          ) : (
            <h6 className="">:{week-paymentData.length}</h6>
          )}
          <img className='userImg' src={image} alt="" />
   </div>
     </>
     }      
 </div>
    <div className="showingUL">
    <table className="">
        {customerType === 'cash' ? (
          <thead>
            <tr className="">
              <th className="">SL</th>
              <th>Collection</th>
              <th>Deposit</th>
              <th>Withdraw</th>
            </tr>
          </thead>
        ) : (
          <thead>
            <tr className="">
              <th className="">SL No</th>
              <th>Payment Date</th>
              <th>Pay Amount</th>
              <th>Collected By</th>
            </tr>
          </thead>
        )}

<tbody>
  {customerType === 'cash'
    ? cashPaymentData?.map((pay, index) => (
        <tr className="hover" key={pay._id}>
          <th>{index + 1}</th>
          <td>{pay?.cashCollection}</td>
          <td>{pay?.cashDeposit}</td>
          <td>{pay?.cashWithdraw}</td>
        </tr>
      ))
    : paymentData?.map((pay, index) => (
        <tr className="hover" key={pay._id}>
          <th>{index + 1}</th>
          <td>{pay?.date}</td>
          <td>{pay?.payment}</td>
          <td>{pay?.collectiorName}</td>
        </tr>
      ))}
</tbody>
      </table>
      <>
        {customerType === 'cash' ? (
          <form onSubmit={cashSubmit}>
          <div className="paymentDivs">
            <input
              type="text"
              name=""
              className="payInput me-3"
              id=""
              placeholder="Cash Collection"
              ref={addCashPayment}
              required
            />
            <br />
            <input
              type="text"
              name=""
              className="payInput me-3"
              id=""
              placeholder="Deposit"
              ref={addCashDeposit}
              required
            />
            <br />
            
          </div>
         <div className="myisnt">
         <input
              type="text"
              name=""
              className="payInput me-3"
              id=""
              placeholder="Withdraw"
              ref={addCashWithdraw}
              required
            />
            <br />
          <input
              type="text"
              name=""
              className="payInput mt-3"
              id=""
              placeholder="Note"
              ref={addNote}
            />
            <br />
         </div>
          <input className="paymentBTN" type="submit" />
        </form>
        ) : (
          <form onSubmit={paySubmit} >
          <div className="paymentDiv">
          <input type="text" name="" className="payInput" id="" placeholder='Make Payment' ref={addPayment} required/>
          <br />
          <input className="paymentBTN" type='submit' value="Pay" name='Pay'/>
          </div>
      </form>
        )}
      </>
      
    </div>   
    </>
  );
};

export default PayTable;