import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import HandpickedCarousel from "../components/Carousel/HandpickedCarousel";
import Listings from "../components/Listings";
import WhyRestNest from "../components/WhyRestNest";
import SmallSlides from "../components/SmallSlides/SmallSlides";
import Carousels from "../components/CustomersReview/Carosels";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="home-page" style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <Navbar />
      <Slide />
      <HandpickedCarousel />
      <Listings />
      <WhyRestNest />
      <SmallSlides />
      <Carousels />
      <Footer />
    </div>
  );
}

export default HomePage;