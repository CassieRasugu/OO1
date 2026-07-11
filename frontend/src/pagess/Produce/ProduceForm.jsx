import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../services/api";

import "./ProduceForm.css";

export default function ProduceForm() {

    const { categoryId } = useParams();
    const navigate = useNavigate();

    // Sidebar Categories
    const [categories, setCategories] = useState([]);

    // Current Category Name
    const [categoryName, setCategoryName] = useState("");

    // Produce Types
    const [produceTypes, setProduceTypes] = useState([]);

    // Locations
    const [locations, setLocations] = useState([]);

    useEffect(() => {

        api
            .get("marketplace/categories/")
            .then((response) => {

                setCategories(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    useEffect(() => {

        api
            .get(`marketplace/categories/${categoryId}/`)
            .then((response) => {

                setCategoryName(response.data.name);

            })
            .catch((error) => {

                console.error(error);

            });

    }, [categoryId]);

    useEffect(() => {

        api
            .get(`marketplace/produce-types/?category=${categoryId}`)
            .then((response) => {

                setProduceTypes(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, [categoryId]);

    useEffect(() => {

        api
            .get("marketplace/locations/")
            .then((response) => {

                setLocations(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, []);

    return (

        <>

            <Navbar />

            <div className="produce-page">

                {/* Sidebar */}

                <aside className="sidebar">

                    <h3>Categories</h3>

                    {categories.map((category) => (

                        <button

                            key={category.id}

                            className={
                                Number(categoryId) === category.id
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                navigate(`/produce/${category.id}`)
                            }

                        >

                            {category.name}

                        </button>

                    ))}

                </aside>

                {/* Form */}

                <main className="produce-form">

                    <h1>{categoryName.toUpperCase()}</h1>

                    <form>

                        <label>Produce Type</label>

                        <select>

                            <option value="">
                                Select Produce
                            </option>

                            {produceTypes.map((produce) => (

                                <option
                                    key={produce.id}
                                    value={produce.id}
                                >

                                    {produce.name}

                                </option>

                            ))}

                        </select>

                        <label>Variety</label>

                        <input
                            type="text"
                            placeholder="e.g. Hass"
                        />

                        <label>Description</label>

                        <textarea
                            rows="4"
                            placeholder="Describe your produce..."
                        />

                        <label>Quantity Available</label>

                        <input
                            type="number"
                            placeholder="Enter quantity"
                        />

                        <label>Unit</label>

                        <input
                            type="text"
                            placeholder="kg, crates, litres..."
                        />

                        <label>Price Per Unit</label>

                        <input
                            type="number"
                            placeholder="Enter price"
                        />

                        <label>Harvest Date</label>

                        <input type="date" />

                        <label>Shelf Life (Days)</label>

                        <input
                            type="number"
                            placeholder="e.g. 30"
                        />

                        <label>Grade</label>

                        <select>

                            <option>Premium</option>

                            <option>Grade A</option>

                            <option>Grade B</option>

                            <option>Standard</option>

                        </select>

                        <label className="checkbox">

                            <input type="checkbox" />

                            Organic Certified

                        </label>

                        <label>Location</label>

                        <select>

                            <option value="">
                                Select Location
                            </option>

                            {locations.map((location) => (

                                <option
                                    key={location.id}
                                    value={location.id}
                                >

                                    {location.town}, {location.county}

                                </option>

                            ))}

                        </select>

                        <button
                            type="submit"
                            className="submit-btn"
                        >

                            Post Produce

                        </button>

                    </form>

                </main>

            </div>

        </>

    );

}