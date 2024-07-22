// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/PagesJs/Login";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Dashboard from "@/PagesJs/Dashboard";
import GuestRoute from "./Components/GuestRoute";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element= {<GuestRoute element={ <Login canResetPassword={false} />}  /> } />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
