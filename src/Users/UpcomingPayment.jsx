import React, { useState } from 'react';
import { Col,Row,  Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from 'react-query';
import ItemBox from '../Nav/ItemBox';
import CustomLoader from '../CustomLoader/CustomLoader';

const UpcomingPayment = () => {
    const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate.toLocaleString())
    const formattedDate = `${startDate.getMonth() + 1}-${startDate.getDate()}-${startDate.getFullYear()}`;
    console.log(formattedDate)
    const url = `https://sinhaenterprise.onrender.com/todaysPayment/${formattedDate}`;
    const {
      data: upcomingPayment = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["todaysPayment",formattedDate],
      queryFn: async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });
    console.log(upcomingPayment)
    return (
        <>
        <ItemBox/>
       <Container>
           <h1>UpComing Payment Check</h1>
           <Row>
                <Col className='mt-5'>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <div>
            {
            isLoading && <CustomLoader/>
          }
            <div className="">
            <table className="">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            upcomingPayment?.map((upcoming, index)=>
              <tr>
              <td>{index+1}</td>
              <td>{upcoming?.name}</td>
            </tr>
              )
          }  
      </tbody>
      </table>
            </div>
            </div>
                </Col>
            </Row>
           
       </Container>
       </>
    );
};

export default UpcomingPayment;