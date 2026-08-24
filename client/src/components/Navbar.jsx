import { Search, Person, Menu, AdminPanelSettings } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

function Navbar() {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/properties/search/${search}`);
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
        <Link to="/admin" className="admin_btn_nav" title="Admin Dashboard">
          <AdminPanelSettings fontSize="small" />
          <span>Admin Panel</span>
        </Link>

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
                src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`}
                alt="profile"
                className="user_avatar"
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
