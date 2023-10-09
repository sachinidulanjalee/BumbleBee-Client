import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import PTSD from "./components/PTSD/PTSD";
import Disoders from "./components/Disoders/Disoders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Starter from "./app/Home/Index";

function App() {

  
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Starter />}></Route>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/disoders" element={<Disoders/>}></Route>
          <Route path="/aboutus" element={<AboutUs/>}></Route>
          <Route path="/PTSD" element={<PTSD/>}></Route>
        </Routes>
      </BrowserRouter>



  );
}

export default App;
