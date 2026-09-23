import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { API_URL } from "../apiConfig";
import "../styles/AdminDashboard.scss";
import {
  Dashboard,
  People,
  HomeWork,
  BookOnline,
  AttachMoney,
  Delete,
  SupervisorAccount,
  Search,
  Refresh,
  TrendingUp,
  Category,
  ArrowBack,
  CheckCircle,
  AdminPanelSettings,
  DarkMode,
  LightMode,
  Logout,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("adminTheme") || "dark";
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("adminTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/listings`);
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/bookings`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers(), fetchListings(), fetchBookings()]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleDeleteUser = async (userId, name) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        showNotice(`User "${name}" deleted successfully.`);
        loadAllData();
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleToggleAdmin = async (userId, name) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/role`, { method: "PATCH" });
      if (res.ok) {
        showNotice(`Updated admin status for "${name}".`);
        loadAllData();
      }
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const handleDeleteListing = async (listingId, title) => {
    if (!window.confirm(`Are you sure you want to delete listing "${title}"?`)) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/admin/listings/${listingId}`, { method: "DELETE" });
      if (res.ok) {
        showNotice(`Listing "${title}" deleted.`);
        loadAllData();
      }
    } catch (err) {
      alert("Failed to delete listing");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredListings = listings.filter(
    (l) =>
      l.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(
    (b) =>
      b.listingId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <Navbar />

      <div className="admin-container">
        {/* SIDEBAR NAVIGATION */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <AdminPanelSettings className="admin-icon-logo" />
            <div>
              <h2>RestNest</h2>
              <span className="badge-admin">Admin Suite 2026</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => { setActiveTab("overview"); setSearchTerm(""); }}
            >
              <Dashboard /> <span>Overview</span>
            </button>
            <button
              className={`nav-item ${activeTab === "listings" ? "active" : ""}`}
              onClick={() => { setActiveTab("listings"); setSearchTerm(""); }}
            >
              <HomeWork /> <span>Listings ({listings.length})</span>
            </button>
            <button
              className={`nav-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => { setActiveTab("users"); setSearchTerm(""); }}
            >
              <People /> <span>Users ({users.length})</span>
            </button>
            <button
              className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => { setActiveTab("bookings"); setSearchTerm(""); }}
            >
              <BookOnline /> <span>Bookings ({bookings.length})</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <Link to="/" className="back-link">
              <ArrowBack /> Return to Home
            </Link>
            <Link to="/admin/login" className="back-link" style={{ marginTop: "0.5rem", color: "#f8395a" }}>
              <AdminPanelSettings /> Switch / Admin Login
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="admin-main">
          {/* HEADER BAR */}
          <header className="admin-header">
            <div className="header-title">
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {user?.firstName || "Administrator"}! Platform statistics, management, and moderation tools</p>
            </div>

            <div className="header-actions" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--admin-card-border, #cbd5e1)",
                  background: "var(--admin-card-bg, #ffffff)",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  color: "inherit",
                }}
                title="Toggle Light / Dark Mode"
              >
                {theme === "dark" ? <LightMode style={{ color: "#f59e0b", fontSize: "1.1rem" }} /> : <DarkMode style={{ color: "#a855f7", fontSize: "1.1rem" }} />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <button className="refresh-btn" onClick={loadAllData} title="Refresh Data">
                <Refresh /> Refresh
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/admin/login");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  background: "rgba(239, 68, 68, 0.12)",
                  color: "#f8395a",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                }}
                title="Sign Out of Administrator Account"
              >
                <Logout style={{ fontSize: "1.1rem" }} /> Sign Out
              </button>
            </div>
          </header>

          {notification && (
            <div className="admin-alert">
              <CheckCircle /> {notification}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="tab-content overview-tab">
                  {/* KPI CARDS GRID */}
                  <div className="stats-grid">
                    <div className="stat-card card-revenue">
                      <div className="stat-icon"><AttachMoney /></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Revenue</span>
                        <h3 className="stat-value">₹{stats?.totalRevenue?.toLocaleString("en-IN") || 0}</h3>
                        <span className="stat-growth"><TrendingUp fontSize="small" /> +18.4% this month</span>
                      </div>
                    </div>

                    <div className="stat-card card-listings">
                      <div className="stat-icon"><HomeWork /></div>
                      <div className="stat-info">
                        <span className="stat-label">Active Listings</span>
                        <h3 className="stat-value">{stats?.totalListings || 0}</h3>
                        <span className="stat-sub">Across 18+ categories</span>
                      </div>
                    </div>

                    <div className="stat-card card-users">
                      <div className="stat-icon"><People /></div>
                      <div className="stat-info">
                        <span className="stat-label">Registered Users</span>
                        <h3 className="stat-value">{stats?.totalUsers || 0}</h3>
                        <span className="stat-sub">Hosts & Travelers</span>
                      </div>
                    </div>

                    <div className="stat-card card-bookings">
                      <div className="stat-icon"><BookOnline /></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Bookings</span>
                        <h3 className="stat-value">{stats?.totalBookings || 0}</h3>
                        <span className="stat-growth">100% Verified Stays</span>
                      </div>
                    </div>
                  </div>

                  {/* TWO COLUMN SUMMARY */}
                  <div className="overview-columns">
                    {/* CATEGORY POPULARITY */}
                    <div className="panel-card category-breakdown">
                      <h3><Category /> Category Breakdown</h3>
                      <div className="category-list-mini">
                        {stats?.categoryStats?.map((cat, i) => (
                          <div key={i} className="category-item">
                            <span className="cat-name">{cat._id}</span>
                            <div className="bar-wrapper">
                              <div
                                className="bar-fill"
                                style={{
                                  width: `${Math.min(100, (cat.count / (stats?.totalListings || 1)) * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="cat-count">{cat.count} stays</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="panel-card recent-activity">
                      <h3><BookOnline /> Recent Bookings</h3>
                      <div className="activity-list">
                        {stats?.recentBookings?.length === 0 ? (
                          <p className="empty-msg">No recent bookings recorded yet.</p>
                        ) : (
                          stats?.recentBookings?.map((b) => (
                            <div key={b._id} className="activity-item">
                              <div className="activity-details">
                                <strong>{b.listingId?.title || "Property Stay"}</strong>
                                <small>Guest: {b.customerId?.firstName} {b.customerId?.lastName}</small>
                              </div>
                              <div className="activity-price">
                                ₹{b.totalPrice?.toLocaleString()}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LISTINGS MANAGEMENT */}
              {activeTab === "listings" && (
                <div className="tab-content">
                  <div className="table-header-bar">
                    <div className="search-box">
                      <Search />
                      <input
                        type="text"
                        placeholder="Search listings by title, city, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <span className="result-count">Showing {filteredListings.length} listings</span>
                  </div>

                  <div className="table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Category</th>
                          <th>Location</th>
                          <th>Price / Night</th>
                          <th>Host</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredListings.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="no-data">No listings match your search.</td>
                          </tr>
                        ) : (
                          filteredListings.map((l) => (
                            <tr key={l._id}>
                              <td className="listing-cell">
                                <img
                                  src={
                                    l.listingPhotoPaths?.[0]
                                      ? `${API_URL}/${l.listingPhotoPaths[0]?.replace("public", "")?.replace(/^[/\\]+/, "")}`
                                      : "assets/slide.jpg"
                                  }
                                  alt={l.title}
                                  className="table-img"
                                />
                                <div className="listing-title-box">
                                  <Link to={`/properties/${l._id}`} className="title-link">
                                    {l.title}
                                  </Link>
                                  <span className="type-tag">{l.type}</span>
                                </div>
                              </td>
                              <td><span className="pill-badge">{l.category}</span></td>
                              <td>{l.city}, {l.country}</td>
                              <td><strong>₹{l.price?.toLocaleString()}</strong></td>
                              <td>{l.creator?.firstName ? `${l.creator.firstName} ${l.creator.lastName}` : "Unknown"}</td>
                              <td>
                                <button
                                  className="btn-danger-icon"
                                  onClick={() => handleDeleteListing(l._id, l.title)}
                                  title="Delete Listing"
                                >
                                  <Delete fontSize="small" /> Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: USERS MANAGEMENT */}
              {activeTab === "users" && (
                <div className="tab-content">
                  <div className="table-header-bar">
                    <div className="search-box">
                      <Search />
                      <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <span className="result-count">Showing {filteredUsers.length} registered users</span>
                  </div>

                  <div className="table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User Profile</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="no-data">No users found.</td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr key={u._id}>
                              <td className="user-cell">
                                <img
                                  src={
                                    u.profileImagePath
                                      ? `${API_URL}/${u.profileImagePath?.replace("public", "")?.replace(/^[/\\]+/, "")}`
                                      : "assets/logo.png"
                                  }
                                  alt="avatar"
                                  className="avatar-img"
                                />
                                <div>
                                  <strong>{u.firstName} {u.lastName}</strong>
                                </div>
                              </td>
                              <td>{u.email}</td>
                              <td>
                                {u.isAdmin ? (
                                  <span className="badge-admin-pill"><SupervisorAccount fontSize="inherit" /> Admin</span>
                                ) : (
                                  <span className="badge-user-pill">Member</span>
                                )}
                              </td>
                              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                              <td className="actions-cell">
                                <button
                                  className="btn-secondary-sm"
                                  onClick={() => handleToggleAdmin(u._id, `${u.firstName} ${u.lastName}`)}
                                >
                                  Toggle Admin
                                </button>
                                <button
                                  className="btn-danger-icon"
                                  onClick={() => handleDeleteUser(u._id, `${u.firstName} ${u.lastName}`)}
                                  title="Delete User"
                                >
                                  <Delete fontSize="small" /> Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: BOOKINGS MANAGEMENT */}
              {activeTab === "bookings" && (
                <div className="tab-content">
                  <div className="table-header-bar">
                    <div className="search-box">
                      <Search />
                      <input
                        type="text"
                        placeholder="Search bookings by listing, guest name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <span className="result-count">Showing {filteredBookings.length} bookings</span>
                  </div>

                  <div className="table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Listing</th>
                          <th>Guest</th>
                          <th>Host</th>
                          <th>Dates</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="no-data">No bookings recorded.</td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b._id}>
                              <td>
                                <strong>{b.listingId?.title || "Listing Removed"}</strong>
                                <div className="sub-text">{b.listingId?.city}, {b.listingId?.country}</div>
                              </td>
                              <td>
                                {b.customerId ? `${b.customerId.firstName} ${b.customerId.lastName}` : "Guest"}
                                <div className="sub-text">{b.customerId?.email}</div>
                              </td>
                              <td>
                                {b.hostId ? `${b.hostId.firstName} ${b.hostId.lastName}` : "Host"}
                              </td>
                              <td>
                                {b.startDate} &rarr; {b.endDate}
                              </td>
                              <td>
                                <strong className="price-tag">₹{b.totalPrice?.toLocaleString()}</strong>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
