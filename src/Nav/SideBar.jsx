import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBox from './ItemBox';
import UsersShow from '../Users/UsersShow';
import CustomLoader from '../CustomLoader/CustomLoader';
import { useQuery } from 'react-query';

const Sidebar = () => {
    // const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const navigate= useNavigate()
    const url = `https://sinhaenterprise-backend-production.up.railway.app/detaCollection`;
    const {
      data: user = [],
      isLoading,
    } = useQuery({
      queryKey: ["detaCollection", ],
      queryFn: async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });

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
        {isLoading && <CustomLoader/>}
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