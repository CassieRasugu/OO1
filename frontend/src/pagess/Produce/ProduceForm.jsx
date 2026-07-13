import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../services/api";

import "./ProduceForm.css";

export default function ProduceForm() {

    const { categoryId } = useParams();

    const navigate = useNavigate();

    /* -----------------------------
       Sidebar Data
    ----------------------------- */

    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");

    const [produceTypes, setProduceTypes] = useState([]);

    const [locations, setLocations] = useState([]);

    /* -----------------------------
       Messages
    ----------------------------- */

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    /* -----------------------------
       Estimated Value
    ----------------------------- */

    const [estimatedValue, setEstimatedValue] = useState(0);

    /* -----------------------------
       Form Data
    ----------------------------- */

    const [formData, setFormData] = useState({

        category: categoryId,

        produce_type: "",

        variety: "",

        description: "",

        quantity_available: "",

        unit: "kg",

        price_per_unit: "",

        harvest_date: "",

        shelf_life_days: "",

        grade: "Standard",

        organic_certified: false,

        location: "",

    });

    /* -----------------------------
       Category List
    ----------------------------- */

    useEffect(() => {

        api.get("marketplace/categories/")

        .then(res => {

            setCategories(res.data);

        })

        .catch(console.error);

    }, []);

    /* -----------------------------
       Current Category
    ----------------------------- */

    useEffect(() => {

        api.get(`marketplace/categories/${categoryId}/`)

        .then(res => {

            setCategoryName(res.data.name);

        })

        .catch(console.error);

    }, [categoryId]);

    /* -----------------------------
       Produce Types
    ----------------------------- */

    useEffect(() => {

        api.get(`marketplace/produce-types/?category=${categoryId}`)

        .then(res => {

            setProduceTypes(res.data);

        })

        .catch(console.error);

    }, [categoryId]);

    /* -----------------------------
       Locations
    ----------------------------- */

    useEffect(() => {

        api.get("marketplace/locations/")

        .then(res => {

            setLocations(res.data);

        })

        .catch(console.error);

    }, []);

    /* -----------------------------
       Keep Category Updated
    ----------------------------- */

    useEffect(() => {

        setFormData(previous => ({

            ...previous,

            category: categoryId,

            produce_type: ""

        }));

    }, [categoryId]);

    /* -----------------------------
       Estimated Total Value
    ----------------------------- */

    useEffect(() => {

        const quantity = Number(formData.quantity_available);

        const price = Number(formData.price_per_unit);

        if(quantity && price){

            setEstimatedValue(quantity * price);

        }

        else{

            setEstimatedValue(0);

        }

    }, [

        formData.quantity_available,

        formData.price_per_unit

    ]);

    /* -----------------------------
       Handle Inputs
    ----------------------------- */

    function handleChange(event){

        const {name,value,type,checked}=event.target;

        setFormData(previous=>({

            ...previous,

            [name]:

                type==="checkbox"

                ? checked

                : value

        }));

    }

    /* -----------------------------
       Submit Produce
    ----------------------------- */

    async function handleSubmit(event){

        event.preventDefault();

        setLoading(true);

        setError("");

        try{

            const token=localStorage.getItem("access");

            await api.post(

                "marketplace/produce/",

                formData,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            alert("Produce posted successfully!");

            navigate("/farmer");

        }

        catch(error){

            console.log(error);

            if(error.response){

                console.log(error.response.data);

            }

            setError("Unable to post produce.");

        }

        finally{

            setLoading(false);

        }

    }
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

                {/* Main Form */}

                <main className="produce-form">

                    <h1>
                        Post {categoryName}
                    </h1>

                    <p className="subtitle">
                        Fill in the details below to list your produce.
                    </p>

                    {error && (

                        <div className="error-box">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Produce Type */}

                        <label>Produce Type</label>

                        <select
                            name="produce_type"
                            value={formData.produce_type}
                            onChange={handleChange}
                            required
                        >

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

                        {/* Variety */}

                        <label>Variety</label>

                        <input
                            type="text"
                            name="variety"
                            value={formData.variety}
                            onChange={handleChange}
                            placeholder="e.g. Hass"
                        />

                        {/* Description */}

                        <label>Description</label>

                        <textarea

                            rows="4"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            placeholder="Describe your produce..."

                            required

                        />

                        {/* Quantity */}

                        <label>Quantity Available</label>

                        <input

                            type="number"

                            name="quantity_available"

                            value={formData.quantity_available}

                            onChange={handleChange}

                            required

                        />

                        {/* Unit */}

                        <label>Unit</label>

                        <select

                            name="unit"

                            value={formData.unit}

                            onChange={handleChange}

                        >

                            <option value="kg">Kilograms</option>

                            <option value="g">Grams</option>

                            <option value="ton">Tonnes</option>

                            <option value="crate">Crates</option>

                            <option value="bag">Bags</option>

                            <option value="piece">Pieces</option>

                            <option value="litre">Litres</option>

                        </select>

                        {/* Price */}

                        <label>Price Per Unit (KES)</label>

                        <input

                            type="number"

                            name="price_per_unit"

                            value={formData.price_per_unit}

                            onChange={handleChange}

                            required

                        />

                        {/* Harvest Date */}

                        <label>Harvest Date</label>

                        <input

                            type="date"

                            name="harvest_date"

                            value={formData.harvest_date}

                            onChange={handleChange}

                            required

                        />

                        {/* Shelf Life */}

                        <label>Shelf Life (Days)</label>

                        <input

                            type="number"

                            name="shelf_life_days"

                            value={formData.shelf_life_days}

                            onChange={handleChange}

                            required

                        />

                        {/* Grade */}

                        <label>Grade</label>

                        <select

                            name="grade"

                            value={formData.grade}

                            onChange={handleChange}

                        >

                            <option value="Premium">Premium</option>

                            <option value="Grade A">Grade A</option>

                            <option value="Grade B">Grade B</option>

                            <option value="Standard">Standard</option>

                        </select>

                        {/* Organic */}

                        <label className="checkbox">

                            <input

                                type="checkbox"

                                name="organic_certified"

                                checked={formData.organic_certified}

                                onChange={handleChange}

                            />

                            Organic Certified

                        </label>

                        {/* Location */}

                        <label>Location</label>

                        <select

                            name="location"

                            value={formData.location}

                            onChange={handleChange}

                            required

                        >

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

                        {/* Estimated Value */}

                        <div className="estimate-card">

                            <h3>

                                Estimated Total Value

                            </h3>

                            <h2>

                                KES {estimatedValue.toLocaleString()}

                            </h2>

                        </div>

                        <button

                            className="submit-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                ?

                                "Posting Produce..."

                                :

                                "Post Produce"

                            }

                        </button>

                    </form>

                </main>

            </div>

        </>

    );

}