import React from "./register.css";
import {Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [email,setEmail]= useState("");
  const [error,setError]= useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();           // Avoid page refresh
    setError(false);
    try{
      const res = await axios.post("http://localhost:5000/backend/auth/register",
      {
        username,
        email,
        password,
      }
      );
      console.log(res.data);
      res.data && window.location.replace("/login");
    }
    catch(err){
      setError(true);
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} className="registerForm">
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style = {{color: "red", marginTop: "10px"}}>
          Check your input !
        </span>
      )}
    </div>
    );
}
