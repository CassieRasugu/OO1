import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import HeroCard from "../../components/HeroCard/HeroCard";
import ProduceCard from "../../components/ProduceCard/ProduceCard";

import { AuthContext } from "../../context/AuthContext";

import api from "../../services/api";

import "./FarmerDashboard.css";

function FarmerDashboard() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [produce, setProduce] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access");

        api.get(
            "marketplace/my-produce/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        .then((response) => {

            setProduce(response.data);

            setLoading(false);

        })

        .catch((error) => {

            console.log(error);

            setLoading(false);

        });

    }, []);

    function handleEdit(id){

        navigate(`/produce/edit/${id}`);

    }

    function handleDelete(id){

        alert(`Delete produce ${id}`);

    }

    if(!user){

        return null;

    }

    return(

        <>

            <Navbar/>

            <HeroCard

                user={user}

                title="Manage all your produce listings."

                buttonText="Post Produce"

                onClick={() => navigate("/categories/produce")}

            />

            <div className="dashboard-container">

                <h2>

                    My Produce

                </h2>

                {loading ? (

                    <h3>

                        Loading produce...

                    </h3>

                ) : produce.length === 0 ? (

                    <div className="empty-state">

                        <h3>

                            You haven't posted any produce yet.

                        </h3>

                        <button

                            onClick={() =>

                                navigate("/categories/produce")

                            }

                        >

                            Post Your First Produce

                        </button>

                    </div>

                ) : (

                    produce.map(item => (

                        <ProduceCard

                            key={item.id}

                            produce={item}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    ))

                )}

            </div>

        </>

    );

}

export default FarmerDashboard;