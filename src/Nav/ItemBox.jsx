import React from 'react';
import { Link } from 'react-router-dom';

const ItemBox = () => {
    return (
        <div className='myBox'>
            <div className="boxItm">
            <p>Photo</p>
            <Link className='nvItm' to="/users">Home</Link>
            <Link className='nvItm' to="/add">Add</Link>
            <Link className='nvItm' to="/upcomingpay">Upcoming</Link>
            <button className="button-34" role="button">LogOut</button>
            </div>
        </div>
    );
};

export default ItemBox;