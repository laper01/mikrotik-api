// src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/PagesJs/Login";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Dashboard from "@/PagesJs/Dashboard";
import GuestRoute from "./Components/GuestRoute";
import Theme from "./Themes";
import FileUpload from "./PagesJs/FileUpload";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element= {<GuestRoute element={ <Login canResetPassword={false} />}  /> } />
                <Route path="/ubah-password" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/export-user" element={<ProtectedRoute element={<FileUpload />} />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
