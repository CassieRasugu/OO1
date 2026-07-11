import "./Login.css";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

function Login(){

    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({

        username:"",
        password:"",

    });

    const [error,setError]=useState("");

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]:e.target.value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        try{

            const response = await api.post(

                "accounts/login/",

                formData

            );

            const access = response.data.access;

            const refresh = response.data.refresh;

            localStorage.setItem("access",access);

            localStorage.setItem("refresh",refresh);

            api.defaults.headers.Authorization=`Bearer ${access}`;

            const userResponse = await api.get(

                "accounts/me/"

            );

            setUser(userResponse.data);

            if(userResponse.data.role==="Farmer"){

                navigate("/farmer");

            }

            else{

                navigate("/buyer");

            }

        }

        catch(err){

            setError("Invalid Username or Password");

        }

    }

    return(

        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <form onSubmit={handleSubmit}>

                    <input

                    name="username"

                    placeholder="Username"

                    onChange={handleChange}

                    />

                    <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    />

                    <button

                    className="primary-button"

                    type="submit"

                    >

                        Login

                    </button>

                </form>

                <p>{error}</p>

            </div>

        </div>

    );

}

export default Login;