import "./sidebar.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
export default function Posts() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
        const getCats = async()=>
        {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    })
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src="https://media.licdn.com/dms/image/D5603AQH3erxHInA15g/profile-displayphoto-shrink_800_800/0/1672566508316?e=1697068800&v=beta&t=F1nfk7iWd8tRHgGy296pvhkqJWUEEXEFc9mxrE8HAsI" alt="" />
            <p> Hey there! Welcome to my blog website. Feel free to add your thoughts by
            creating new blogs and let others read your thoughts as well!</p>
        </div>  
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
            {cats.map((c)=>(
                <Link className="link" to={`/?cat=${c.name}`}>
                <li className="sidebarListItem">{c.name}</li>
                </Link>
            ))}
                
            </ul>
        </div> 
        <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
            <i className="fb sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="x sidebarIcon fa-brands fa-x-twitter"></i>
            <i className="pinterest sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="insta sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
        </div> 
    </div>
  )
}
