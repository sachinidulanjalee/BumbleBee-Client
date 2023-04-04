import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./views/Login/Login";
import UnAuthorized from "./views/UnAuthorized/UnAuthorized";
import CustomerRegistration from "./views/CustomerRegistration/CustomerRegistration";


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {});
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/CustomerRegistration" element={<CustomerRegistration />} />
          <Route path="/UnAuthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NavBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
