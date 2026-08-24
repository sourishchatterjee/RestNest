import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Reviews } from "./Review";
import { FormatQuote, Star, Verified } from "@mui/icons-material";
import "./Carousels.css";

const Carousels = () => {
  return (
    <section className="reviews-section">
      <div className="section-header">
        <span className="badge-pill"><Verified fontSize="small" /> Guest Reviews</span>
        <h2>Loved by Travelers Worldwide</h2>
        <p>Real stories and verified experiences from our guest community</p>
      </div>

      <div className="reviews-slider-box">
        <Splide
          options={{
            type: "loop",
            perPage: 2,
            perMove: 1,
            gap: "24px",
            autoplay: true,
            interval: 5000,
            pagination: false,
            arrows: true,
            breakpoints: {
              900: { perPage: 1 },
            },
          }}
        >
          {Reviews.map((review) => (
            <SplideSlide key={review.id}>
              <div className="review-card">
                <FormatQuote className="quote-icon" />

                <p className="review-text">{review.text}</p>

                <div className="review-footer">
                  <img className="reviewer-img" src={review.image} alt={review.name} />
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <span className="reviewer-location">{review.location}</span>
                    <div className="star-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="star-icon" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Carousels;
