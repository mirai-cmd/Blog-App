import React from "./post.css";
import {Link} from "react-router-dom";


export default function Post({ post }){
  return (
    <div className="post">
      {post.photo && <img className="postImg" alt="" src={post.photo}/>}
        <div className="postInfo">
            <div classname="postCats">
              {post.categories.map((c) => {
                <span className="postCat">{c.name}</span>
                })
              }
            </div>
            <Link className="link" to={`/post/${post._id}`}>
            <span className="postTitle">{post.title}</span>
            </Link> 
            <hr/>
            <span className="postDate">
            {new Date(post.createdAt).toDateString()}
            </span>
        </div>
        <p className="postDesc">
            {post.desc}
      </p>
    </div>
  );
}
