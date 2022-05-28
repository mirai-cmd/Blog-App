import React from "./write.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/backend/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/backend/posts",
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form onSubmit={handleSubmit} className="writeForm">
            <div className="writeFormInput">
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"/>
                </label>
                <input type="file" 
                id="fileInput" 
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                ></input>
                <input type="text" 
                className="writeInput" 
                placeholder="Title" 
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
                >
                </input>
            </div>  
            <div className="writeFormGroup">
              <textarea
                placeholder="Tell your story..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
                >
              </textarea>
            </div>
            <button type="submit" className="writeSubmit">
              Publish
            </button>
        </form>
    </div>
  );
}
