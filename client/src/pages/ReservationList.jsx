import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { API_URL } from "../apiConfig";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const reservationList = user?.reservationList || [];
  const dispatch = useDispatch();

  const getReservationList = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setReservationList(Array.isArray(data) ? data : []));
      }
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>No reservations made yet.</p>
        ) : (
          reservationList.map(
            ({
              _id,
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                key={_id || listingId?._id}
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
            )
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
