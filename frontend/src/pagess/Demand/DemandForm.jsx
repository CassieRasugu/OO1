import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import api from "../../services/api";

import "./DemandForm.css";

export default function DemandForm() {

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
       Form Data
    ----------------------------- */

    const [formData, setFormData] = useState({

        category: categoryId,

        produce_type: "",

        variety: "",

        description: "",

        minimum_quantity: "",

        maximum_quantity: "",

        unit: "kg",

        minimum_budget: "",

        maximum_budget: "",

        maximum_distance_km: 20,

        minimum_grade: "Standard",

        organic_required: false,

        needed_before: "",

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
       Submit Demand
    ----------------------------- */

    async function handleSubmit(event){

        event.preventDefault();

        if(Number(formData.minimum_quantity) > Number(formData.maximum_quantity)){

            setError("Minimum quantity cannot exceed maximum quantity.");

            return;

        }

        if(Number(formData.minimum_budget) > Number(formData.maximum_budget)){

            setError("Minimum budget cannot exceed maximum budget.");

            return;

        }

        setLoading(true);

        setError("");

        try{

            const token=localStorage.getItem("access");

            await api.post(

                "marketplace/demands/",

                formData,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            alert("Demand posted successfully!");

            navigate("/profile");

        }

        catch(error){

            console.log(error);

            if(error.response){

                console.log(error.response.data);

            }

            setError("Unable to post demand.");

        }

        finally{

            setLoading(false);

        }

    }
        return (

        <>

            <Navbar />

            <div className="demand-page">

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
                                navigate(`/demand/${category.id}`)
                            }

                        >

                            {category.name}

                        </button>

                    ))}

                </aside>

                {/* Main Form */}

                <main className="demand-form">

                    <h1>
                        Request {categoryName}
                    </h1>

                    <p className="subtitle">
                        Fill in the details below to post your demand.
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

                        <label>Variety (optional)</label>

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

                            placeholder="Describe what you need..."

                            required

                        />

                        {/* Quantity Range */}

                        <div className="split-row">

                            <div>

                                <label>Minimum Quantity</label>

                                <input

                                    type="number"

                                    name="minimum_quantity"

                                    value={formData.minimum_quantity}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div>

                                <label>Maximum Quantity</label>

                                <input

                                    type="number"

                                    name="maximum_quantity"

                                    value={formData.maximum_quantity}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

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

                        {/* Budget Range */}

                        <div className="split-row">

                            <div>

                                <label>Minimum Budget (KES)</label>

                                <input

                                    type="number"

                                    name="minimum_budget"

                                    value={formData.minimum_budget}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div>

                                <label>Maximum Budget (KES)</label>

                                <input

                                    type="number"

                                    name="maximum_budget"

                                    value={formData.maximum_budget}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>

                        {/* Distance */}

                        <label>Maximum Distance (km)</label>

                        <input

                            type="number"

                            name="maximum_distance_km"

                            value={formData.maximum_distance_km}

                            onChange={handleChange}

                            required

                        />

                        {/* Needed Before */}

                        <label>Needed Before</label>

                        <input

                            type="date"

                            name="needed_before"

                            value={formData.needed_before}

                            onChange={handleChange}

                            required

                        />

                        {/* Minimum Grade */}

                        <label>Minimum Grade</label>

                        <select

                            name="minimum_grade"

                            value={formData.minimum_grade}

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

                                name="organic_required"

                                checked={formData.organic_required}

                                onChange={handleChange}

                            />

                            Organic Required

                        </label>

                        {/* Location */}

                        <label>Preferred Location</label>

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

                        <button

                            className="submit-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                ?

                                "Posting Demand..."

                                :

                                "Post Demand"

                            }

                        </button>

                    </form>

                </main>

            </div>

        </>

    );

}