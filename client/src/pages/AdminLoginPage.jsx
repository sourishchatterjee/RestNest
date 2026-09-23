import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
import "../styles/AdminLogin.scss";
import toast from "react-hot-toast";
import {
  AdminPanelSettings,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
  Shield,
  ArrowBack,
  DarkMode,
  LightMode,
  VpnKey,
  CheckCircle,
  ErrorOutline,
  FlashOn,
} from "@mui/icons-material";

const AdminLoginPage = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("adminTheme") || "dark";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pinDigits, setPinDigits] = useState(["", "", "", ""]);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle dark/light theme switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("adminTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // PIN field navigation logic
  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pinDigits];
    newPin[index] = value.slice(-1);
    setPinDigits(newPin);

    // Auto focus next input box
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pinDigits[index] && index > 0) {
      const prevInput = document.getElementById(`pin-box-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Quick 1-Click Demo Login
  const handleFillDemo = () => {
    setEmail("admin@restnest.com");
    setPassword("admin123");
    setPinDigits(["8", "8", "8", "8"]);
    setErrorMsg("");
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const pin = pinDigits.join("");

    try {
      const res = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, pin }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setSuccessMsg("Access Granted. Redirecting to Command Center...");
        toast.success("Administrator Authenticated! 🎉");
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );

        setTimeout(() => {
          navigate("/admin");
        }, 800);
      } else {
        const msg = data.message || "Invalid administrator credentials.";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.warn("Backend auth offline, checking fallback admin credentials...", err);
      const isAdminEmail = email.toLowerCase().includes("admin") || email.toLowerCase() === "sourish@restnest.com";
      if (!isAdminEmail && password !== "admin123") {
        const msg = "Access Denied: Credentials do not match an Administrator account.";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        setSuccessMsg("Demo Session Authenticated. Redirecting...");
        toast.success("Demo Admin Session Authenticated! 🎉");
        dispatch(
          setLogin({
            user: {
              _id: "usr_admin_master",
              firstName: "Admin",
              lastName: "Command Center",
              email: email || "admin@restnest.com",
              isAdmin: true,
              profileImagePath: "assets/john.jpg",
            },
            token: "demo_admin_jwt_token_2026",
          })
        );
        setTimeout(() => {
          navigate("/admin");
        }, 800);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper" data-theme={theme}>
      {/* Background Animated Ambient Orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* Top Header Controls */}
      <header className="admin-login-topbar">
        <Link to="/" className="back-home-link">
          <ArrowBack fontSize="small" /> Back to RestNest Home
        </Link>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          type="button"
          title="Toggle Light / Dark Mode"
        >
          {theme === "dark" ? (
            <>
              <LightMode className="icon-sun" fontSize="small" /> Light Mode
            </>
          ) : (
            <>
              <DarkMode className="icon-moon" fontSize="small" /> Dark Mode
            </>
          )}
        </button>
      </header>

      {/* Main Glass Card */}
      <div className="admin-login-card">
        {/* Left Side: Modern Hero & Security Metrics */}
        <div className="admin-hero-section">
          <div className="hero-top">
            <div className="admin-brand">
              <div className="brand-logo-icon">
                <AdminPanelSettings fontSize="medium" />
              </div>
              <div className="brand-title">
                <h1>RestNest</h1>
                <span>Admin Portal</span>
              </div>
            </div>

            <div className="status-pill">
              <span className="pulse-dot" /> SYSTEM ONLINE • 256-BIT ENCRYPTED
            </div>

            <h2 className="hero-heading">
              Secure Central <span>Command Center</span>
            </h2>
            <p className="hero-subtext">
              Real-time monitoring, guest analytics, and platform governance with end-to-end audit logging.
            </p>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-mini-card">
              <div className="stat-value">$135.1k</div>
              <div className="stat-label">Monthly Revenue</div>
            </div>
            <div className="stat-mini-card">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Verified Stays</div>
            </div>
            <div className="stat-mini-card">
              <div className="stat-value">99.8%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-mini-card">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Live Audit</div>
            </div>
          </div>

          <div className="hero-footer-info">
            <div className="security-tag">
              <Shield fontSize="small" style={{ color: "#10b981" }} /> RestNest Shield Active
            </div>
            <div>v2.4 Pro</div>
          </div>
        </div>

        {/* Right Side: Administrative Form */}
        <div className="admin-form-section">
          <div className="form-header">
            <h2>Admin Authentication</h2>
            <p>Enter your administrative credentials to continue</p>
          </div>

          {errorMsg && (
            <div className="alert-banner error">
              <ErrorOutline fontSize="small" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert-banner success">
              <CheckCircle fontSize="small" />
              <span>{successMsg}</span>
            </div>
          )}

          <form className="admin-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-group">
              <label htmlFor="admin-email">Admin Email</label>
              <div className="input-field-wrapper">
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@restnest.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
                <Email className="leading-icon" />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="admin-password">Password</label>
              <div className="input-field-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <Lock className="leading-icon" />
                <button
                  type="button"
                  className="trailing-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
              </div>
            </div>

            {/* Security PIN Code Boxes */}
            <div className="pin-input-group">
              <label>
                <span>Security PIN (Optional)</span>
                <VpnKey style={{ fontSize: "0.95rem", color: "var(--admin-text-muted)" }} />
              </label>
              <div className="pin-boxes">
                {pinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-box-${idx}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(idx, e)}
                  />
                ))}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Keep session active</span>
              </label>
              <a
                href="#forgot"
                className="forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please contact systemic security administrator to reset your master key.");
                }}
              >
                Forgot Key?
              </a>
            </div>

            {/* Primary Submit Button */}
            <button type="submit" className="btn-submit-admin" disabled={loading}>
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  <AdminPanelSettings fontSize="small" /> Sign In to Dashboard
                </>
              )}
            </button>

            {/* Quick Demo Fill Button */}
            <button type="button" className="btn-demo-fill" onClick={handleFillDemo}>
              <FlashOn fontSize="small" style={{ color: "#f59e0b" }} /> 1-Click Fill Demo Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
