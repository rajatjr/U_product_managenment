import React from 'react';
import './App.css';
import {Outlet, Navigate } from "react-router-dom";

function Privatelayout() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export default Privatelayout;