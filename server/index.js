// const express = require("express")
// const app = express()
// const mongoose = require("mongoose")
// const dotenv= require("dotenv").config()
// const cors = require("cors")

// const authRoutes = require("./routes/auth.js")
// const listingRoutes = require("./routes/listing.js")
// const bookingRoutes = require("./routes/booking.js")
// const userRoutes = require("./routes/user.js")

// app.use(cors())
// app.use(express.json())
// app.use(express.static("public"))

// /* Routes */
// app.use("/auth",authRoutes)
// app.use("/properties", listingRoutes)
// app.use("/bookings",bookingRoutes)
// app.use("users",userRoutes)

// /*Mongoose setup */
// const PORT= 3001
// mongoose
// .connect(process.env.MONGO_URL,{
//     dbName:"RestNest",
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// }) 
// .then(()=> {
//     app.listen(PORT,()=> console.log(`Server Port: ${PORT}`));
// })
// .catch((err) => console.log(`${err} did not connect`))





const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")
const adminRoutes = require("./routes/admin.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)
app.use("/admin", adminRoutes)

/* MONGOOSE SETUP & SERVER LISTEN */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`RestNest Server running on Port: ${PORT}`);
});

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Dream_Nest",
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.warn(`MongoDB connection warning: ${err.message}. Running in fallback mode.`));
}

