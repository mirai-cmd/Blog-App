import React from "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { LoginSuccess } from "../../context/Actions";
import { useRef, useContext } from "react";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/backend/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      dispatch(LoginSuccess(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  
  return (
    <div className="login">
        <span className="logintitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
            
            <label>Username</label>
            <input className="loginInput" 
              type="text" 
              placeholder="Enter your username"
              ref={userRef}></input>
            
            <label>Password</label>
            <input className="loginInput" 
              type="password" 
              placeholder="Enter your password"
              ref={passwordRef}></input>
            
            <button className="loginButton" type="submit" disabled={isFetching}>
              Login
            </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
    </div>
  );
}
