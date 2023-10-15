import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import noImage from "../asset/noimage.png"
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
      <div className="boxItm pb-5">
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
            <div>
                {user?.photoURL ? (
                  <img
                    className=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                ) : (
                  <img
                    className=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={noImage}
                    alt=""
                  />
                )}
              </div>
            <button className="logOutButton ms-2" onClick={handleLogout} role="button">
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
