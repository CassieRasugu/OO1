import "./Navbar.css";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

    FaPlus,

    FaRegUserCircle,

    FaSignOutAlt,

} from "react-icons/fa";

import api from "../../services/api";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("access");

        if (!token) return;

        api.get("accounts/me/", {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        })

        .then((response) => {

            setUser(response.data);

        })

        .catch((error) => {

            console.log(error);

        });

    }, []);

    function handlePlus() {

        if (!user) return;

        if (user.role === "Farmer") {

            navigate("/categories/produce");

        }

        else {

            navigate("/categories/demand");

        }

    }

    function logout() {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <h2
                className="logo"
                onClick={() => {

                    if (!user) {

                        navigate("/");

                    }

                    else if (user.role === "Farmer") {

                        navigate("/farmer");

                    }

                    else {

                        navigate("/buyer");

                    }

                }}
            >

                🌿 Organic Oasis

            </h2>

            <div className="navbar-icons">

                <FaPlus

                    className="icon"

                    onClick={handlePlus}

                />

                <div className="profile-section">

                    <FaRegUserCircle

                        className="icon"

                        onClick={() =>

                            setShowMenu(!showMenu)

                        }

                    />

                    {showMenu && user && (

                        <div className="profile-menu">

                            <h3>{user.username}</h3>

                            <p>{user.role}</p>

                            <hr />

                            <button

                                onClick={() =>

                                    navigate("/profile")

                                }

                            >

                                My Profile

                            </button>

                            <button

                                className="logout-btn"

                                onClick={logout}

                            >

                                <FaSignOutAlt />

                                Logout

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;