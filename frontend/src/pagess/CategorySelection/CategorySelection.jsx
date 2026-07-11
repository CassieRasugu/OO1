import "./CategorySelection.css";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import api from "../../services/api";

import {

FaAppleAlt,

FaCarrot,

FaSeedling,

FaLeaf

} from "react-icons/fa";

import {

GiWheat,

GiMilkCarton,

GiRose

} from "react-icons/gi";

function CategorySelection({ mode }) {

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        api.get("marketplace/categories/")
        .then((response) => {

            setCategories(response.data);

        });

    }, []);

    function getIcon(name){

        switch(name.toLowerCase()){

            case "fruits":
                return <FaAppleAlt />;

            case "vegetables":
                return <FaCarrot />;

            case "flowers":
                return <GiRose />;

            case "dairy":
                return <GiMilkCarton />;

            case "cereals":
                return <GiWheat />;

            case "spices":
                return <FaLeaf />;

            default:
                return <FaSeedling />;

        }

    }

    function handleClick(category){

        if(mode==="produce"){

            navigate(`/produce/new?category=${category.id}`);

        }

        else{

            navigate(`/demand/new?category=${category.id}`);

        }

    }

    return(

        <>

        <Navbar/>

        <div className="category-page">

            <h1>

                Click on Produce Category

            </h1>

            <div className="category-grid">

                {categories.map(category=>(

                    <div

                        key={category.id}

                        className="category-card"

                        onClick={()=>handleClick(category)}

                    >

                        <div className="circle">

                            {getIcon(category.name)}

                        </div>

                        <p>

                            {category.name}

                        </p>

                    </div>

                ))}

            </div>

        </div>

        </>

    );

}

export default CategorySelection;