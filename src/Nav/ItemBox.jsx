import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const ItemBox = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logged out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="myBox">
      <div className="boxItm">
        <p>Photo</p>
        <Link className="nvItm" to="/users">
          Home
        </Link>
        <Link className="nvItm" to="/add">
          Add
        </Link>
        <Link className="nvItm" to="/upcomingpay">
          Upcoming
        </Link>
        {user && (
          <div className="displayname">
            <p>Hi, {user.displayName}</p>
            <button className="button ps-1" onClick={handleLogout} role="button">
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
