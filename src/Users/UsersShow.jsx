import React from 'react';
import { Link } from 'react-router-dom';

const UsersShow = ({userData, index}) => {
    const {_id,name, mobileNumber, userSerialNo, customerType}= userData;
    const handleClick = () => {
      // Open the phone app.
      window.open(`tel:${mobileNumber}`);
    };
    return (
        <>
        <tbody>
            <tr>
          <td>{index+1}</td>
          <td>{userSerialNo}</td>
          <td>{name}
          {
            customerType ==="cash" ? <div style={{color:"turquoise"}}>C</div> : <div style={{color:"aqua"}}>P</div>
          }</td>
          <td>  <a className='mobileHRF' href={`tel:${mobileNumber}`} onClick={handleClick}>
          <i className="fa-solid fa-phone"></i>
    </a>
    </td>
          <td>
          <Link className="titleLink" to={`/products/${_id}`}>
          <i className="fa-solid fa-calculator fa-2x ps-3"></i>
          </Link>
          </td>
        </tr>
      </tbody>
      </>
    );
};

export default UsersShow;