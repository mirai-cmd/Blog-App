import React from "./home.css";
import Posts from "../../Components/posts/Posts";
import Sidebar from "../../Components/sidebar/Sidebar";
import Header from "../../Components/header/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() =>{
    const fetchPosts = async() => {
      const res = await axios.get("http://localhost:5000/backend/posts/" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, search);
  return (
    <>
      <Header />
    <div className="home">
      <Posts posts={posts} />
      <Sidebar/>
    </div>
    </>
  );
}