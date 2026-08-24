import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { AutoAwesome } from "@mui/icons-material";
import "./style.css";

const SmallSlides = () => {
  const experiences = [
    {
      name: "Maldives Overwater Bungalows",
      subtitle: "Private Pool & Crystal Lagoon",
      badge: "ULTIMATE LUXURY",
      logo: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Swiss Alpine Ski Lodges",
      subtitle: "Fireplace & Mountain Views",
      badge: "WINTER ESCAPE",
      logo: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Bali Jungle Treehouses",
      subtitle: "Infinity Pools & Rainforests",
      badge: "NATURAL SANCTUARY",
      logo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Amalfi Coast Cliffside Villas",
      subtitle: "Mediterranean Sea Panoramas",
      badge: "ROMANTIC GETAWAY",
      logo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Tokyo Penthouse Suites",
      subtitle: "Skyline Views & Modern Tech",
      badge: "URBAN ELEGANCE",
      logo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="small-slides-section">
      <div className="section-header">
        <span className="badge-pill"><AutoAwesome fontSize="small" /> Trending Experiences</span>
        <h2>Curated World Experiences</h2>
        <p>Iconic stays crafted for extraordinary memories</p>
      </div>

      <div className="small-slides-container">
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            perMove: 1,
            gap: "20px",
            autoplay: true,
            interval: 4000,
            pagination: false,
            arrows: true,
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
        >
          {experiences.map((item, index) => (
            <SplideSlide key={index}>
              <div className="experience-card">
                <img src={item.logo} alt={item.name} className="card-bg-img" />
                <div className="card-gradient-overlay" />
                <span className="exp-badge">{item.badge}</span>
                <div className="exp-info">
                  <h4>{item.name}</h4>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default SmallSlides;
