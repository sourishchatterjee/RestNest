import { Search, Person, Menu, AdminPanelSettings, LightMode, DarkMode } from "@mui/icons-material";
import variables from "../styles/variables.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import toast from "react-hot-toast";
import { API_URL } from "../apiConfig";

function Navbar({ theme, toggleTheme }) {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/properties/search/${search.trim()}`);
    } else {
      toast.error("Please enter a destination to search.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar_logo">
        <img src="/assets/logo1.png" alt="RestNest Logo" />
        <span className="brand-name">RestNest</span>
      </Link>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search destinations, villas, beaches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="search_icon_btn"
          onClick={handleSearch}
          disabled={search.trim() === ""}
          title="Search"
        >
          <Search />
        </button>
      </div>

      <div className="navbar_right">
        {toggleTheme && (
          <button
            className={`theme_toggle_btn ${theme === "light" ? "light" : "dark"}`}
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <>
                <LightMode fontSize="small" className="theme_icon sun" />
                <span className="theme_label">Light</span>
              </>
            ) : (
              <>
                <DarkMode fontSize="small" className="theme_icon moon" />
                <span className="theme_label">Dark</span>
              </>
            )}
          </button>
        )}

        <Link to={user ? "/create-listing" : "/login"} className="host">
          Become A Host
        </Link>

        <div className="account_wrapper">
          <button
            className="navbar_right_account"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <Menu sx={{ color: variables.darkgrey }} />
            {user ? (
              <img
                src={
                  user?.profileImagePath
                    ? `${API_URL}/${user.profileImagePath.replace("public", "").replace(/^\/+/, "")}`
                    : "/assets/denny.jpeg"
                }
                alt="profile"
                className="user_avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/denny.jpeg";
                }}
              />
            ) : (
              <Person sx={{ color: variables.darkgrey }} />
            )}
          </button>

          {dropdownMenu && (
            <div className="navbar_right_accountmenu">
              <Link to="/admin" onClick={() => setDropdownMenu(false)}>
                ⚙️ Admin Dashboard
              </Link>
              <hr />
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setDropdownMenu(false)}>Log In</Link>
                  <Link to="/register" onClick={() => setDropdownMenu(false)}>Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to={`/${user._id}/trips`} onClick={() => setDropdownMenu(false)}>Trip List</Link>
                  <Link to={`/${user._id}/wishList`} onClick={() => setDropdownMenu(false)}>Wish List</Link>
                  <Link to={`/${user._id}/properties`} onClick={() => setDropdownMenu(false)}>Property List</Link>
                  <Link to={`/${user._id}/reservations`} onClick={() => setDropdownMenu(false)}>Reservation List</Link>
                  <Link to="/create-listing" onClick={() => setDropdownMenu(false)}>Become A Host</Link>
                  <hr />
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                      setDropdownMenu(false);
                      toast.success("Logged out successfully.");
                    }}
                  >
                    Log Out
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
