import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import PTSD from "./components/PTSD/PTSD";
import Disoders from "./components/Disoders/Disoders";
import BasicTest from "./components/BasicTest/BasicTest";
import BipolarDisorder from "./components/BipolarDisorder/BipolarDisorder"
import GAD from "./components/GAD/GAD"
import MajorDepression from "./components/MajorDepression/MajorDepression"
import OCDTest from "./components/OCDTest/OCDTest"
import Schizophrenia from "./components/Schizophrenia/Schizophrenia"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Starter from "./app/Home/Index";
import SignUp from "./components/SignUp/SingUp"
import ResultPage from "./components/BasicResult/BasicResult"
import Professional from "./components/Professional/Professional"
import Professionalragistration from "./components/Professionalragistration/Professionalragistration"



function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Starter />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/disoders" element={<Disoders />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/PTSD" element={<PTSD />}></Route>
        <Route path="/BasicTest" element={<BasicTest />}></Route>
        <Route path="/BipolarDisorder" element={<BipolarDisorder />}></Route>
        <Route path="/GAD" element={<GAD />}></Route>
        <Route path="/MajorDepression" element={<MajorDepression />}></Route>
        <Route path="/OCDTest" element={<OCDTest />}></Route>
        <Route path="/Schizophrenia" element={<Schizophrenia />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route exact path="/" component={BasicTest} />
        <Route path="/BasicResult" component={ResultPage} />
        <Route path="/Professional" element={<Professional />}></Route>
        <Route path="/Professionalragistration" element={<Professionalragistration />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
