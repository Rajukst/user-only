import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBox from './ItemBox';
import UsersShow from '../Users/UsersShow';

const Sidebar = () => {
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const navigate= useNavigate()
    const url = "https://asadtelecom.onrender.com/detaCollection";
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setUser(data));
    }, []);

    const handleLogout = () => {
        // logOut()
        //   .then(() => {
        //     toast.success("User logged out");
        //     navigate("/");
        //   })
        //   .catch((error) => console.log(error));
      };
    return (
        <>
        <ItemBox/>  
        <div className="myNv pt-4">
            <div className="searchBox mt-5">
            <input
            className='mySearch' 
            type="text" name="" id="" placeholder='Search User'
            onChange={(e) => setSearch(e.target.value)}
            />
            </div>
        </div> 
       <main className='usrLst'>
       <table className="scrollTBL">
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        {user
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item?.name?.toLowerCase().includes(search);
          })
          ?.map((singleData, index) => (
            <UsersShow
              key={singleData._id}
              userData={singleData}
              index={index}
            ></UsersShow>
          ))}
      </table>
       </main>
       </>
    );
};

export default Sidebar;