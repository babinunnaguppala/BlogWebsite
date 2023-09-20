import "./TopBar.css"
import Babi1 from "../../assets/Babi1.jpg"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fb fab fa-facebook-square"></i>
        <i className="topIcon x fab fa-x-twitter"></i>
        <i className="topIcon pinterest fab fa-pinterest-square"></i>
        <i className="topIcon insta fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="linkedin.com/in/babi-nunnaguppala-9a391723b">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" onClick={() => window.location = 'mailto:babinunnaguppala@gmail.com'}>
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}