import React from "./settings.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useContext } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import { useState } from "react";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/backend/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/backend/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your account</span>
                <span className="settingsDeleteTitle">Delete your account</span>
            </div>
            <form onSubmit={handleSubmit} className="settingsForm">
                <label>Profile Picture</label>
                <div className="settingsPic">
                    <img 
                        src={file ? URL.createObjectURL(file) : PF + user.profilePic}/>
                    <label htmlFor="fileInput">
                        <i className="settingsPicIcon far fa-user-circle"/>
                    </label>
                    <input type="file" 
                    id="fileInput" 
                    style={{display: "none"}}
                    onChange={(e) => setFile(e.target.files[0])}
                    ></input>
                </div>
            <label>Username</label>
            <input type="text" placeholder={user.username}></input>
            <label>Email</label>
            <input type="text" placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Password</label>
            <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="settingsSubmit">
                Update
            </button>
            {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
            </form>
            </div>
        <Sidebar/>
    </div>
  );
}
