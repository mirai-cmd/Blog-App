import React from "./sidebar.css";

export default function sideBar() {
  return (
    <div className="sideBar">
        <div className="sideBarItem">
            <span className="sideBarTitle">ABOUT ME</span>
            <img alt="image about me"
                src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
                />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Ipsa mollitia dolorem quas dignissimos illum sunt sequi voluptates commodi aliquam?
                Soluta aliquid porro reprehenderit asperiores explicabo adipisci neque deleniti deserunt natus.
            </p>
        </div>
        <div className="sideBarItem">
            <span className="sideBarTitle">CATEGORIES</span>
            <ul className="sideBarList">
                <li className="sideBarListItem">Life</li>
                <li className="sideBarListItem">Music</li>
                <li className="sideBarListItem">Styles</li>
                <li className="sideBarListItem">Sports</li>
                <li className="sideBarListItem">Teach</li>
                <li className="sideBarListItem">Cinema</li>
            </ul>
        </div>
        <div className="sideBarItem">
            <span className="sideBarTitle">FOLLOW US</span>
            <div className="sideBarSocial">
                <i className="fa-brands fa-facebook-square"></i>
                <i className="fa-brands fa-twitter-square"></i>
                <i className="fa-brands fa-pinterest"></i>
                <i className="fa-brands fa-instagram-square"></i>
            </div>
        </div>
    </div>
  );
}
