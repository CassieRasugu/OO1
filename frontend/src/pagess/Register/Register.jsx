import "./Register.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function Register() {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        first_name: "",

        last_name: "",

        username: "",

        email: "",

        phone_number: "",

        county: "",

        town: "",

        password: "",

        confirm_password: "",

        role: searchParams.get("role") === "farmer"
            ? "Farmer"
            : "Buyer",

        bio: "",
    });

    const [message, setMessage] = useState("");

    function handleChange(e){

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        try{

            await api.post("accounts/register/", formData);

            alert("Account Created Successfully!");

            navigate("/login");

        }

        catch(error){

            console.log(error.response);

            setMessage("Registration Failed.");

        }

    }

    return(

        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p>Join Organic Oasis</p>

                <form onSubmit={handleSubmit}>

                    <input
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    />

                    <input
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    />

                    <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    />

                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    />

                    <input
                    name="phone_number"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    />

                    <input
                    name="county"
                    placeholder="County"
                    onChange={handleChange}
                    />

                    <input
                    name="town"
                    placeholder="Town"
                    onChange={handleChange}
                    />

                    <textarea
                    name="bio"
                    placeholder="Tell us about yourself"
                    onChange={handleChange}
                    />

                    <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    >

                        <option value="Farmer">Farmer</option>

                        <option value="Buyer">Buyer</option>

                    </select>

                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    />

                    <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />

                    <button
                    className="primary-button"
                    type="submit"
                    >

                        Create Account

                    </button>

                </form>

                <p>{message}</p>

            </div>

        </div>

    );

}

export default Register;