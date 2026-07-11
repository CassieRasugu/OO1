import { Routes, Route } from "react-router-dom";

import Landing from "../pagess/Landing/Landing";
import Register from "../pagess/Register/Register";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;