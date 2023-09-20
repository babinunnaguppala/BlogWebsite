import "./header.css"
import bg from "../../assets/b.jpg"
export default function Header() {
  return (
    <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Welcome to the</span>
                <span className="headerTitleLg">Blog Website</span>
            </div>
            <img className="headerImg" src={bg} alt="" />
    </div>
  )
}
