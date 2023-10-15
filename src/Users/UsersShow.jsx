import React from 'react';
import { Link } from 'react-router-dom';

const UsersShow = ({userData, index}) => {
    const {_id,name, mobileNumber}= userData;
    const handleClick = () => {
      // Open the phone app.
      window.open(`tel:${mobileNumber}`);
    };
    return (
        <>
        <tbody>
            <tr>
          <td>{index+1}</td>
          <td>{name}</td>
          <td>  <a className='mobileHRF' href={`tel:${mobileNumber}`} onClick={handleClick}>
      {mobileNumber}
    </a></td>
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