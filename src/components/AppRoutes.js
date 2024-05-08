import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Student from "./Student/ViewStudent";

import Profile from "./Profile";
import User from "./User/ViewUser";

const AppRoutes = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Signup/>} />
                    <Route exact path="/Login" element={<Login/>} />
                    <Route exact path="/Student" element={<Student/>} />
                    <Route exact path="/MyProfile/:id" element={<Profile/>} />
                    <Route exact path="/User" element={<User/>} />

                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}
export default AppRoutes;
