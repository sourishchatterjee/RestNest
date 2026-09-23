import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import HandpickedCarousel from "../components/Carousel/HandpickedCarousel";
import Listings from "../components/Listings";
import WhyRestNest from "../components/WhyRestNest";
import SmallSlides from "../components/SmallSlides/SmallSlides";
import Carousels from "../components/CustomersReview/Carosels";
import Footer from "../components/Footer";
import "../styles/HomePage.scss";
import { LightMode, DarkMode } from "@mui/icons-material";
import toast from "react-hot-toast";

function HomePage() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("restnest_home_theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("restnest_home_theme", theme);

    return () => {
      // Revert to dark by default when leaving home page if needed
    };
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    toast(
      nextTheme === "dark" ? "Dark Mode Activated 🌙" : "Light Mode Activated ☀️",
      {
        icon: nextTheme === "dark" ? "🌙" : "☀️",
        style: {
          borderRadius: "12px",
          background: nextTheme === "dark" ? "#1e293b" : "#ffffff",
          color: nextTheme === "dark" ? "#f8fafc" : "#0f172a",
          border: nextTheme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
        },
      }
    );
  };

  return (
    <div className={`home-page ${theme === "light" ? "light-mode" : "dark-mode"}`} data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Slide theme={theme} />
      <HandpickedCarousel theme={theme} />
      <Listings theme={theme} />
      <WhyRestNest theme={theme} />
      <SmallSlides theme={theme} />
      <Carousels theme={theme} />
      <Footer theme={theme} />

      {/* FLOATING QUICK THEME SWITCHER */}
      <button
        className="floating_theme_switch"
        onClick={toggleTheme}
        aria-label="Toggle Dark / Light Theme"
        title={`Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        <div className="switch_track">
          <div className={`switch_thumb ${theme === "light" ? "thumb-light" : "thumb-dark"}`}>
            {theme === "dark" ? (
              <DarkMode className="switch_icon" />
            ) : (
              <LightMode className="switch_icon sun" />
            )}
          </div>
        </div>
        <span className="floating_text">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      </button>
    </div>
  );
}

export default HomePage;