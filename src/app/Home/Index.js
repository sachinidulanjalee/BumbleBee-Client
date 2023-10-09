import React, { useState, useEffect } from "react";
import HomePage from "../../components/HomePage/HomePage";
import Travel from "../../components/travel/Travel";
import AboutUs from "../../components/about-us/AboutUs";
import Disoders from "../../components/Disoders/Disoders";
import Footer from "../../components/footer/Footer";


function Starter() {
  return (
    <>
          <HomePage />
          <Travel/>
          <AboutUs/>
          <Footer/>
    </>
  );
}

export default Starter;
