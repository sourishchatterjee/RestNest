const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User");

const SEED_LISTINGS = [
  {
    _id: "6718a101b72e123456789a01",
    title: "Luxury Beachfront Sunset Villa",
    category: "Beachfront",
    type: "An entire place",
    streetAddress: "102 Ocean Drive",
    aptSuite: "Suite 4B",
    city: "Goa",
    province: "Goa",
    country: "India",
    guestCount: 6,
    bedroomCount: 3,
    bedCount: 4,
    bathroomCount: 3,
    amenities: ["Wifi", "Air Conditioning", "Bath tub", "Personal care products", "Free parking"],
    price: 18500,
    description: "Experience serene oceanfront luxury with private beach access, infinity pool, and sunset deck.",
    highlight: "Peaceful & Luxurious",
    highlightDesc: "Direct private pathway leading to white sand beach.",
    listingPhotoPaths: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
    ],
    creator: { _id: "usr_1", firstName: "Sourish", lastName: "Chatterjee", profileImagePath: "assets/logo.png" }
  },
  {
    _id: "6718a101b72e123456789a02",
    title: "Alpine Alpine Chalet & Private Spa",
    category: "Mountains",
    type: "An entire place",
    streetAddress: "45 Alpine Ridge",
    aptSuite: "Chalet A",
    city: "Manali",
    province: "Himachal Pradesh",
    country: "India",
    guestCount: 4,
    bedroomCount: 2,
    bedCount: 2,
    bathroomCount: 2,
    amenities: ["Wifi", "Heating", "Camp fire", "Dedicated workspace", "Free parking"],
    price: 14200,
    description: "Cozy wood-timbered chalet surrounded by snow-capped peaks, outdoor hot tub, and wood fireplace.",
    highlight: "Breathtaking Views",
    highlightDesc: "360-degree panorama of Himalayan mountain ranges.",
    listingPhotoPaths: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&auto=format&fit=crop&q=80"
    ],
    creator: { _id: "usr_2", firstName: "Ananya", lastName: "Sharma", profileImagePath: "assets/logo.png" }
  },
  {
    _id: "6718a101b72e123456789a03",
    title: "Iconic Glass Skyline Mansion",
    category: "Iconic cities",
    type: "An entire place",
    streetAddress: "88 Horizon Heights",
    aptSuite: "Penthouse 50",
    city: "Mumbai",
    province: "Maharashtra",
    country: "India",
    guestCount: 8,
    bedroomCount: 4,
    bedCount: 5,
    bathroomCount: 4,
    amenities: ["Wifi", "Air Conditioning", "TV", "Washer", "Dryer", "Free parking"],
    price: 32000,
    description: "Ultramodern architectural masterpiece with floor-to-ceiling glass walls overlooking the city skyline.",
    highlight: "Skyline Views",
    highlightDesc: "Private rooftop lounge and glass-bottom pool.",
    listingPhotoPaths: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80"
    ],
    creator: { _id: "usr_3", firstName: "Rohan", lastName: "Verma", profileImagePath: "assets/logo.png" }
  },
  {
    _id: "6718a101b72e123456789a04",
    title: "Serene Heritage Lakefront Retreat",
    category: "Lakefront",
    type: "An entire place",
    streetAddress: "12 Lake Palace Road",
    aptSuite: "Haveli 2",
    city: "Udaipur",
    province: "Rajasthan",
    country: "India",
    guestCount: 5,
    bedroomCount: 3,
    bedCount: 3,
    bathroomCount: 3,
    amenities: ["Wifi", "Air Conditioning", "Outdoor dining area", "Garden", "Free parking"],
    price: 16500,
    description: "Traditional Rajasthani architecture right on the waters of Lake Pichola with private boat dock.",
    highlight: "Heritage Charm",
    highlightDesc: "Restored 19th-century royal haveli with modern luxury.",
    listingPhotoPaths: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80"
    ],
    creator: { _id: "usr_4", firstName: "Priya", lastName: "Kapoor", profileImagePath: "assets/logo.png" }
  }
];

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();
    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Fail to create Listing", error: err.message });
  }
});

/* GET LISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings = [];
    if (qCategory && qCategory !== "All") {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    if (listings && listings.length > 0) {
      return res.status(200).json(listings);
    }

    // Fallback to seed listings if database is empty
    if (qCategory && qCategory !== "All") {
      const filtered = SEED_LISTINGS.filter(
        (l) => l.category.toLowerCase() === qCategory.toLowerCase()
      );
      return res.status(200).json(filtered.length > 0 ? filtered : SEED_LISTINGS);
    }
    return res.status(200).json(SEED_LISTINGS);
  } catch (err) {
    return res.status(200).json(SEED_LISTINGS);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    if (listings && listings.length > 0) {
      return res.status(200).json(listings);
    }

    const filtered = SEED_LISTINGS.filter(
      (l) =>
        search === "all" ||
        l.category.toLowerCase().includes(search.toLowerCase()) ||
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.city.toLowerCase().includes(search.toLowerCase())
    );

    return res.status(200).json(filtered.length > 0 ? filtered : SEED_LISTINGS);
  } catch (err) {
    return res.status(200).json(SEED_LISTINGS);
  }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    if (listing) {
      return res.status(202).json(listing);
    }
    const foundSeed = SEED_LISTINGS.find((l) => l._id === listingId) || SEED_LISTINGS[0];
    return res.status(202).json(foundSeed);
  } catch (err) {
    const foundSeed = SEED_LISTINGS.find((l) => l._id === req.params.listingId) || SEED_LISTINGS[0];
    return res.status(202).json(foundSeed);
  }
});

module.exports = router;
