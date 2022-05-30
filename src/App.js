import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./global.css";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { logout } from "./utils";


export default function App() {
    const location = useLocation()

    async function handleLogout() {
        if (!window.walletConnection.isSignedIn()) {
            if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
                window.history.pushState({}, "", "/login");
                window.history.go()
            }
        }
    }

    useEffect(() => {
        handleLogout()
    })

    return (
        <div className="App">
            {(location.pathname == '/login' || location.pathname == '/signup') ? <div /> : <Navbar />}
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>

    );
}
