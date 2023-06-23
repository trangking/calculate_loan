import "./nav.css";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
      <nav className="menu-bar">
        <div>
       <Link to="/">
          <img
            src="heng.png"
            alt="heng"
            height={50}
            width={50}
            className="bgimg"
          />
          <p className="item">HENG LEASING</p>
          </Link>
        </div>
      </nav>
    );
  };

export default Navbar;