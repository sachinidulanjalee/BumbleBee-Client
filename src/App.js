import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./views/Login/Login";
import UnAuthorized from "./views/UnAuthorized/UnAuthorized";
import RegisterForm from "./views/CustomerRegistration/RegisterForm";


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {});
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/UnAuthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NavBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
