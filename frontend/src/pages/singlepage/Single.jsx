import React from "./single.css";
import SideBar from "../../Components/sidebar/Sidebar";
import SinglePost from "../../Components/singlepost/SinglePost";


export default function Single() {
  return (
    <div className="single">
      <SinglePost/>
      <SideBar/>
    </div>
  );
}
