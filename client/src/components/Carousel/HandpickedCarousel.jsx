import React from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Star, Explore } from "@mui/icons-material";
import "./Carousel.css";

const HandpickedCarousel = () => {
  const collections = [
    {
      title: "Beachfront Sanctuaries",
      tag: "TOP DESTINATION",
      rating: "4.98",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Mountain & Alpine Chalets",
      tag: "TRENDING",
      rating: "4.96",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Iconic Modern Estates",
      tag: "LUXURY",
      rating: "4.99",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Serene Lakefront Lodges",
      tag: "BEST VIEW",
      rating: "4.94",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Ancient Castles & Heritage",
      tag: "HISTORIC",
      rating: "4.92",
      img: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Tropical Island Villas",
      tag: "EXOTIC",
      rating: "4.97",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="handpicked-section">
      <div className="section-header">
        <span className="badge-pill"><Explore fontSize="small" /> Handpicked Collections</span>
        <h2>Explore Signature Stays</h2>
        <p>Curated collections designed for every dream journey and getaway</p>
      </div>

      <div className="carousel-wrapper">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 1,
            gap: "24px",
            pagination: false,
            arrows: true,
            breakpoints: {
              1200: { perPage: 3 },
              768: { perPage: 2 },
              480: { perPage: 1 },
            },
          }}
        >
          {collections.map((item, index) => (
            <SplideSlide key={index}>
              <div className="handpicked-card">
                <div className="card-image-box">
                  <img src={item.img} alt={item.title} />
                  <div className="overlay-gradient" />
                  <span className="tag-chip">{item.tag}</span>
                  <div className="rating-badge">
                    <Star fontSize="small" /> {item.rating}
                  </div>
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default HandpickedCarousel;
