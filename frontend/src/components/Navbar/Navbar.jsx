import "./Navbar.css";
//import logo from "../../assets/logo.png";
import { FaPlus, FaRegUserCircle } from "react-icons/fa";

function Navbar() {

    return (

        <nav className="navbar">

            <img
                //src={logo}
                className="logo"
                alt="Organic Oasis"
            />

            <div className="navbar-icons">

                <FaPlus className="icon"/>

                <FaRegUserCircle className="icon"/>

            </div>

        </nav>

    );

}

export default Navbar;