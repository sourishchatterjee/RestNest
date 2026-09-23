import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { API_URL } from "../apiConfig";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!customerId) {
      toast.error("Please log in to book this property.");
      navigate("/login");
      return;
    }

    if (dayCount < 1) {
      toast.error("Please select a valid stay date range (minimum 1 night).");
      return;
    }

    const toastId = toast.loading("Processing your reservation...");

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator?._id || listing.creator,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(`${API_URL}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        toast.success("Reservation confirmed! Enjoy your stay! 🎉", { id: toastId });
        navigate(`/${customerId}/trips`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to create booking. Please try again.", { id: toastId });
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
      toast.error("Unable to connect to the booking server. Please try again.", { id: toastId });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={item.startsWith("http") ? item : `${API_URL}/${item.replace("public", "").replace(/^\/+/, "")}`}
              alt="listing photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80";
              }}
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={
              listing.creator?.profileImagePath
                ? `${API_URL}/${listing.creator.profileImagePath.replace("public", "").replace(/^\/+/, "")}`
                : "/assets/denny.jpeg"
            }
            alt="creator profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/denny.jpeg";
            }}
          />
          <h3>
            Hosted by {listing.creator?.firstName || "Host"} {listing.creator?.lastName || ""}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {(Array.isArray(listing.amenities) && listing.amenities.length > 0
                ? (typeof listing.amenities[0] === "string" ? listing.amenities[0].split(",") : listing.amenities)
                : []
              ).map((item, index) => {
                const trimmed = typeof item === "string" ? item.trim() : item;
                return (
                  <div className="facility" key={index}>
                    <div className="facility_icon">
                      {
                        facilities.find((facility) => facility.name.trim().toLowerCase() === trimmed.toLowerCase())
                          ?.icon
                      }
                    </div>
                    <p>{trimmed}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ₹{listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹{listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default ListingDetails;
