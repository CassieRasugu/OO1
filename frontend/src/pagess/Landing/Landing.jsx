import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate();

    return (

        <div className="landing">

            <h1>Welcome to Organic Oasis</h1>

            <p>Connecting Farmers and Buyers Across Kenya</p>

            <div className="cards">

                <div
                    className="card"
                    onClick={() => navigate("/register?role=farmer")}
                >

                    <h2>🌾 Farmer</h2>

                    <p>Sell your produce</p>

                </div>

                <div
                    className="card"
                    onClick={() => navigate("/register?role=buyer")}
                >

                    <h2>🛒 Buyer</h2>

                    <p>Buy fresh produce</p>

                </div>

            </div>

            <div className="login-link">

                Already have an account?

                <span
                    onClick={() => navigate("/login")}
                >
                    Login
                </span>

            </div>

        </div>

    );

}

export default Landing;