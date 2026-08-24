import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";

// Admin Protected Route Guard
const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLoginPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/properties/:listingId" element={<ListingDetails/>}/>
        <Route path="/properties/category/:category" element={<CategoryPage/>}/>
        <Route path="/properties/search/:search" element={<SearchPage/>}/>
        
        <Route path="/:userId/trips" element={<TripList/>}/>
        <Route path="/:userId/wishList" element={<WishList/>}/>
        <Route path="/:userId/properties" element={<PropertyList/>}/>
        <Route path="/:userId/reservations" element={<ReservationList/>}/>
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
