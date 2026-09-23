import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const loggedIn = await response.json();

      if (response.ok && loggedIn.user) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        toast.success(`Welcome back, ${loggedIn.user.firstName || "User"}!`, { id: toastId });
        navigate("/");
      } else {
        toast.error(loggedIn.message || "Invalid email or password.", { id: toastId });
      }
    } catch (err) {
      console.log("Login failed", err.message);
      toast.error("Unable to connect to the server. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='login'>
        <div className='login_content'>
          <form className='login_content_form' onSubmit={handleSubmit}>
            <input
              placeholder='Email'
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' disabled={loading}>
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
          <a href='/register'>Don't have an account? Sign In Here</a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;