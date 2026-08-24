import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
  Star,
  Verified,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  province,
  country,
  category,
  type,
  price,
  title,
  startDate,
  endDate,
  totalPrice,
  booking = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.some((item) => item?._id === listingId);

  const patchWishList = async (e) => {
    e.stopPropagation();
    if (!user) return;
    if (creator && user?._id === creator._id) return;

    try {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.wishList) {
        dispatch(setWishList(data.wishList));
      }
    } catch (err) {
      console.error("Failed to patch wishlist:", err);
    }
  };

  const getImageUrl = (photo) => {
    if (!photo) return "assets/slide.jpg";
    if (photo.startsWith("http")) return photo;
    return `http://localhost:3001/${photo.replace("public", "")}`;
  };

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.length > 0 ? (
            listingPhotoPaths.map((photo, index) => (
              <div key={index} className="slide">
                <img
                  src={getImageUrl(photo)}
                  alt={`listing ${index + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
            ))
          ) : (
            <div className="slide">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80"
                alt="default property"
              />
            </div>
          )}
        </div>

        {listingPhotoPaths.length > 1 && (
          <>
            <button className="prev-button" onClick={goToPrevSlide}>
              <ArrowBackIosNew sx={{ fontSize: "14px" }} />
            </button>
            <button className="next-button" onClick={goToNextSlide}>
              <ArrowForwardIos sx={{ fontSize: "14px" }} />
            </button>
            <div className="dots-container">
              {listingPhotoPaths.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                />
              ))}
            </div>
          </>
        )}

        <span className="guest-badge">
          <Verified fontSize="inherit" /> Superhost
        </span>

        <button
          className={`favorite-btn ${isLiked ? "liked" : ""}`}
          onClick={patchWishList}
          disabled={!user}
          title={user ? "Save to Wishlist" : "Log in to save"}
        >
          <Favorite />
        </button>
      </div>

      <div className="card-info">
        <div className="location-rating-row">
          <h3 className="location-name">
            {city ? `${city}, ${country}` : "Luxury Property"}
          </h3>
          <span className="rating-pill">
            <Star fontSize="inherit" /> 4.95
          </span>
        </div>

        <p className="card-category">{category} &bull; {type}</p>

        {!booking ? (
          <div className="price-row">
            <span className="price-bold">₹{price?.toLocaleString()}</span>
            <span className="price-unit">night</span>
          </div>
        ) : (
          <div className="price-row">
            <span className="booking-dates">{startDate} - {endDate}</span>
            <span className="price-bold">₹{totalPrice?.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
