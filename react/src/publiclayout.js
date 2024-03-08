import React from 'react';
import './App.css';
import {Outlet, Navigate } from "react-router-dom";
function Publiclayout() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/home" />
    }
    return <Outlet />

}

export default Publiclayout;