import React from 'react';
import "../styles/List.scss";
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

function WishList() {
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>No items in your wish list yet.</p>
        ) : (
          wishList.map(
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
                booking={booking}
              />
            )
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default WishList;