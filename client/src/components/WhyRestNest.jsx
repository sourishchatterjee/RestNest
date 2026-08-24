import React from "react";
import "../styles/WhyRestNest.scss";
import {
  VerifiedUser,
  SupportAgent,
  Key,
  Shield,
  Star,
} from "@mui/icons-material";

const WhyRestNest = () => {
  const features = [
    {
      icon: <VerifiedUser className="feature-icon" />,
      title: "Verified Superhosts",
      description:
        "Every listing is hand-inspected and top-rated for safety, cleanliness, and comfort.",
      tag: "Top Tier",
    },
    {
      icon: <Key className="feature-icon" />,
      title: "Smart Keyless Access",
      description:
        "Effortless self check-in with digital smart locks and 24/7 keyless code generation.",
      tag: "2026 Tech",
    },
    {
      icon: <SupportAgent className="feature-icon" />,
      title: "24/7 VIP Support",
      description:
        "Our dedicated travel concierges are available round the clock for instant assistance.",
      tag: "Live 24/7",
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Price & Quality Guarantee",
      description:
        "100% price match guarantee with transparent pricing and instant booking protection.",
      tag: "Protected",
    },
  ];

  return (
    <section className="why-restnest">
      <div className="why-container">
        <div className="why-header">
          <span className="badge-subtitle"><Star fontSize="small" /> Why Choose RestNest</span>
          <h2>Redefining Modern Hospitality</h2>
          <p>Designed for seamless luxury, peace of mind, and unforgettable stays across the globe.</p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="card-top">
                <div className="icon-wrapper">{item.icon}</div>
                <span className="tag-badge">{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="stat-banner">
          <div className="stat-box">
            <h4>10,000+</h4>
            <span>Curated Stays</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <h4>4.95 ★</h4>
            <span>Average Guest Rating</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <h4>120+</h4>
            <span>Countries Covered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <h4>99.8%</h4>
            <span>Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRestNest;
