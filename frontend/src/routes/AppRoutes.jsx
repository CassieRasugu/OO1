import { Routes, Route } from "react-router-dom";

import Landing from "../pagess/Landing/Landing";
import Register from "../pagess/Register/Register";
import Login from "../pagess/Login/Login";
import FarmerDashboard from "../pagess/FarmerDashboard/FarmerDashboard";
import BuyerDashboard from "../pagess/BuyerDashboard/BuyerDashboard";
import CategorySelection from "../pagess/CategorySelection/CategorySelection";
import ProduceForm from "../pagess/Produce/ProduceForm";
import Profile from "../pagess/Profile/Profile";

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
            <Route path="/produce/:categoryId" element={<ProduceForm />} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    );
}

export default AppRoutes;