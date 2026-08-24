
// import { useEffect} from "react";
// import "../styles/List.scss";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// // import Footer from "../components/Footer";

// const TripList = () => {
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);
//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/trips`,
//         {
//           method: "GET",
//         }
//       );
//       const data = await response.json();
//       dispatch(setTripList(data));

//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List sourish</h1>
      
//          {tripList?.map(({
//              listingId, 
//              hostId, 
//              startDate, 
//              endDate, 
//              totalPrice, 
//              booking=true 
//             }) => (

//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))} 
      
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default TripList;




import { useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const userId = useSelector((state) => state.user._id); // Get user ID from Redux store
  const tripList = useSelector((state) => state.user.tripList); // Get trip list from Redux store
  const dispatch = useDispatch();

  // Fetch trip list from the backend
  const getTripList = async () => {
    try {
      console.log("Fetching trip list...");
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
      console.log("Fetched trip list:", data);
      dispatch(setTripList(data)); // Update Redux store with fetched trips
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  // Remove a trip by ID (Locally without API request)
  const removeTrip = (tripId) => {
    try {
      console.log(`Removing trip with ID: ${tripId}`);

      // Update trip list locally in Redux
      const updatedTripList = tripList.filter((trip) => trip._id !== tripId);
      console.log("Updated trip list after deletion:", updatedTripList);
      dispatch(setTripList(updatedTripList)); // Dispatch updated trip list to Redux store
    } catch (err) {
      console.log("Remove Trip failed!", err.message);
    }
  };

  // Fetch trips on component mount
  useEffect(() => {
    getTripList();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(
          ({
            _id, // Unique trip ID
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <div key={_id} className="trip-item">
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
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
        )}
      </div>
       <Footer /> 
    </>
  );
};

export default TripList;
