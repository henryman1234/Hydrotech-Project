import React from "react";
import Hero from "../../components/hero/Hero";
import Features from "../../components/Features/Features";
import Testimonials from "../../components/testimonials/Testimonials";
import Contacts from "../../components/Contacts/Contacts";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


const Home = function () {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Features/>
            <Testimonials/>
            <Contacts/>
            <Footer/>
        </div>
    )
}

export default Home