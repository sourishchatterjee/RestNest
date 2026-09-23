import React, { useEffect, useState } from 'react';
import "../styles/List.scss";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ListingCard from "../components/ListingCard";
import { setPropertyList } from '../redux/state';
import Loader from "../components/Loader";
import Footer from "../components/Footer";

function PropertyList() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setPropertyList(Array.isArray(data) ? data : []));
      }
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [user?._id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>No properties listed yet.</p>
        ) : (
          propertyList.map(
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

export default PropertyList;