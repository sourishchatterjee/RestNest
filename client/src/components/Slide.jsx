import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Slide.scss";
import { Search, LocationOn, CalendarMonth, People, Star, Verified } from "@mui/icons-material";

function Slide() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim() !== "") {
      navigate(`/properties/search/${destination}`);
    } else {
      navigate(`/properties/search/all`);
    }
  };

  return (
    <div className="hero-slide">
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">
          <Verified fontSize="small" />
          <span>RestNest 2026 Flagship Experience</span>
        </div>

        <h1 className="hero-title">
          Find Your Next Sanctuary <br />
          <span className="gradient-text">Wherever You Roam</span>
        </h1>

        <p className="hero-subtitle">
          "No matter where you travel, may every moment become a timeless memory." <br />
          Discover handpicked luxury villas, beachfront retreats, and mountain chalets.
        </p>

        {/* FLOATING SEARCH CARD */}
        <form className="hero-search-bar" onSubmit={handleSearch}>
          <div className="search-field">
            <LocationOn className="field-icon" />
            <div className="field-inputs">
              <label>Where</label>
              <input
                type="text"
                placeholder="Search destination (e.g. Bali, Beach...)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="divider" />

          <div className="search-field">
            <CalendarMonth className="field-icon" />
            <div className="field-inputs">
              <label>Dates</label>
              <input type="text" placeholder="Add dates" readOnly value="Anytime" />
            </div>
          </div>

          <div className="divider" />

          <div className="search-field">
            <People className="field-icon" />
            <div className="field-inputs">
              <label>Guests</label>
              <input type="text" placeholder="Add guests" readOnly value="1 Guest +" />
            </div>
          </div>

          <button type="submit" className="hero-search-btn">
            <Search /> Search
          </button>
        </form>

        {/* HERO QUICK STATS */}
        <div className="hero-chips">
          <div className="chip-item">
            <Star className="chip-icon" />
            <span>4.95 Guest Favorite Rating</span>
          </div>
          <div className="chip-item">
            <Verified className="chip-icon" />
            <span>100% Superhost Verified</span>
          </div>
          <div className="chip-item">
            <span>⚡ Instant Smart Lock Check-In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;