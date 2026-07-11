import { Routes, Route } from "react-router-dom";

import Landing from "../pagess/Landing/Landing";
import Register from "../pagess/Register/Register";
import Login from "../pagess/Login/Login";
import FarmerDashboard from "../pagess/FarmerDashboard/FarmerDashboard";
import BuyerDashboard from "../pagess/BuyerDashboard/BuyerDashboard";
import CategorySelection from "../pagess/CategorySelection/CategorySelection";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
             <Route path="/farmer" element={<FarmerDashboard/>}/>
            <Route path="/buyer" element={<BuyerDashboard/>}/>
            <Route path="/categories/produce" element={<CategorySelection mode="produce" />} />
            <Route path="/categories/demand" element={<CategorySelection mode="demand" />} />
            <Route
    path="/produce/new"
    element={<h1>Produce Form Coming Next</h1>}
/>

<Route
    path="/demand/new"
    element={<h1>Demand Form Coming Next</h1>}
/>
        </Routes>
    );
}

export default AppRoutes;