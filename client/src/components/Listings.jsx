import { useEffect, useState, useCallback } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { HomeWork } from "@mui/icons-material";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings || []);

  const getFeedListings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: Array.isArray(data) ? data : [] }));
    } catch (err) {
      console.error("Fetch Listings Failed:", err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    getFeedListings();
  }, [getFeedListings]);

  return (
    <section className="listings-section">
      <div className="category-bar-wrapper">
        <div className="category-list">
          {categories?.map((category, index) => (
            <div
              className={`category ${category.label === selectedCategory ? "selected" : ""}`}
              key={index}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <div className="empty-listings">
          <HomeWork className="empty-icon" />
          <h3>No Properties Found</h3>
          <p>There are currently no listings available under "{selectedCategory}". Try selecting another category!</p>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              title,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                title={title}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Listings;
