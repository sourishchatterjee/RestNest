import { useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const tripList = user?.tripList || [];
  const dispatch = useDispatch();

  const getTripList = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch trips: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch(setTripList(Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  const removeTrip = (tripId) => {
    try {
      const updatedTripList = tripList.filter((trip) => trip._id !== tripId);
      dispatch(setTripList(updatedTripList));
    } catch (err) {
      console.log("Remove Trip failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>No trips booked yet.</p>
        ) : (
          tripList.map(
            ({
              _id,
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <div key={_id} className="trip-item">
                <ListingCard
                  listingId={listingId?._id || listingId}
                  creator={hostId?._id || hostId}
                  listingPhotoPaths={listingId?.listingPhotoPaths || []}
                  city={listingId?.city || ""}
                  province={listingId?.province || ""}
                  country={listingId?.country || ""}
                  category={listingId?.category || ""}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
                  booking={booking}
                />
                <button
                  className="remove-button"
                  onClick={() => removeTrip(_id)}
                >
                  Remove
                </button>
              </div>
            )
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
