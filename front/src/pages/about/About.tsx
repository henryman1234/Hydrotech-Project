import React from "react";
import Banner from "../../components/aboutComponents/Banner";
import MainAbout from "../../components/aboutComponents/MainAbout";
import Values from "../../components/aboutComponents/Values";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const About = function () {
    return (
        <div id="about">
            <Navbar/>
            <Banner/>
            <MainAbout/>
            <Values/>
            <Footer/>
        </div>
    )
}

export default About