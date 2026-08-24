import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { LocalPhone, Email, Send, AdminPanelSettings, Security } from "@mui/icons-material";

function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim() !== "") {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* BRAND COLUMN */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/assets/logo1.png" alt="RestNest Logo" />
              <span className="brand-title">RestNest</span>
            </Link>

            <p className="brand-desc">
              Your premier sanctuary booking platform. Discover luxury villas, mountain chalets, and beachfront retreats around the globe.
            </p>

            <div className="newsletter-box">
              <span>Subscribe for Exclusive Offers</span>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit">
                  <Send fontSize="small" />
                </button>
              </form>
              {subscribed && <span className="subscribe-notice">✓ Subscribed successfully!</span>}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Explore Stays</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
              <li><Link to="/create-listing">Become a Host</Link></li>
              <li><a href="#handpicked">Handpicked Collections</a></li>
              <li><a href="#reviews">Guest Reviews</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="footer-column">
            <h4>Support & Safety</h4>
            <ul>
              <li><a href="#concierge">24/7 VIP Concierge</a></li>
              <li><a href="#verification">Superhost Verification</a></li>
              <li><a href="#refund">Guest Refund Policy</a></li>
              <li><a href="#safety">Smart Lock Safety</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* CONTACT & PAYMENTS */}
          <div className="footer-column contact-column">
            <h4>Contact Concierge</h4>
            <div className="contact-info">
              <div className="info-row">
                <LocalPhone /> <span>+1 (800) 555-NEST</span>
              </div>
              <div className="info-row">
                <Email /> <span>support@restnest.com</span>
              </div>
              <div className="info-row">
                <Security /> <span>Secured 256-Bit SSL Booking</span>
              </div>
            </div>

            <img src="/assets/payment.png" alt="Accepted Payment Methods" className="payment-img" />
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 RestNest Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/admin" className="admin-footer-btn">
              <AdminPanelSettings fontSize="small" /> Admin Suite
            </Link>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
