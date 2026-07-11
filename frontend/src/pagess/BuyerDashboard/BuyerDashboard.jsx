import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import HeroCard from "../../components/HeroCard/HeroCard";

import { AuthContext } from "../../context/AuthContext";

//import farmer from "../../assets/farmer.png";

function FarmerDashboard(){

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    if(!user){

        return null;

    }

    return(

        <>

        <Navbar/>

        <HeroCard

            user={user}

            //image={farmer}

            title="Let's find fresh produce for you"

            buttonText="Post Your Demands Now!!"

            onClick={() => navigate("/categories/demand")}

        />

        </>

    );

}

export default FarmerDashboard;