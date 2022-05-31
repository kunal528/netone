import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./global.css";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import { logout } from "./utils";


export default function App() {
    const location = useLocation()
    const [added, setAdded] = React.useState(0);

    async function handleLogout() {
        if (!window.walletConnection.isSignedIn()) {
            if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
                window.history.pushState({}, "", "/login");
                window.history.go()
            }
        }
    }

    function handleAdd() {
        setAdded(val => val + 1);
    }

    useEffect(() => {
        handleLogout()
    })

    return (
        <div className="App">
            {(location.pathname == '/login' || location.pathname == '/signup') ? <div /> : <Navbar onPost={handleAdd} />}
            <Routes>
                <Route exact path="/" element={<HomePage postEdit={added}/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/user/:account" element={<UserDetails />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>

    );
}
