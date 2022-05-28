import React from './topbar.css';
import { Link } from "react-router-dom";
import { Context } from "./../../context/Context";
import { useContext } from "react";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
        <div className="topLeft">
            <i className="fa-brands fa-facebook-square"></i>
            <i className="fa-brands fa-twitter-square"></i>
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-instagram-square"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                <Link className="link" to="/">
                  HOME
                </Link></li>
                <li className="topListItem">
                <Link className="link" to="about">  
                  ABOUT
                </Link>
                  </li>
                <li className="topListItem">
                <Link className="link" to="contact">
                  CONTACT
                </Link>
                  </li>
                <li className="topListItem">
                <Link className="link" to="write">
                  WRITE
                </Link>
                </li>
                <li onClick={handleLogout} className="topListItem">
                {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImage"
              alt="Profile Pic"
              src={PF + user.profilePic}
            />
          </Link>
        ) : (
          <>
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="register">
                  REGISTER
                </Link>
              </li>
            </ul>
          </>
        )}
        <i className="topSearchIcon fa fa-search"></i>
      </div>
    </div>
  );
}