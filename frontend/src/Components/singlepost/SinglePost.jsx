import { Link, useLocation } from "react-router-dom";
import React from "./singlepost.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "./../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
  
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
  
    useEffect(() => {
      const getPost = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/backend/posts/" + path
          );
          console.log("Res : ", res);
          setPost(res.data);
          setDesc(res.data.desc);
          setTitle(res.data.title);
        } catch (err) {
          console.log("ERROR : ", err);
        }
      };
      getPost();
    }, [path]);
  
    const handleDelete = async (e) => {
      try {
        await axios.delete("http://localhost:5000/backend/posts/" + path, {
          data: {
            username: user.username,
          },
        });
        window.location.replace("/");
      } catch (err) {}
    };
  
    const handleUpdate = async (e) => {
      try {
        await axios.put("http://localhost:5000/backend/posts/" + path, {
          username: user.username,
          title,
          desc,
        });
        setUpdateMode(false);
      } catch (err) {}
    };

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && (<img src={PF + post.photo}/>
            )}
            {updateMode ? (
            <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
            />
            ) : (
            <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username &&(
                <div className="singlepostEdit">
                    <i
                    onClick={() => setUpdateMode(true)}
                    class="singlePostIconfar fa-edit"
                    ></i>
                    <i
                    class="singlePostIconfar far fa-trash-alt"
                    onClick={handleDelete}
                    ></i>
                </div>
                )}
            </h1>
            )}
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Author : 
                    <Link className="link" to={`/?user=${post.username}`}>
                        <b>{post.username}</b>
                    </Link>
                </span>
                <span className="singlePostDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        </div>
    </div>
  );
}
