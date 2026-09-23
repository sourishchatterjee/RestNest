import React, { useEffect, useState } from 'react';
import "../styles/Register.scss";
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from "react-hot-toast";
import { API_URL } from "../apiConfig";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      toast.error("Please enter your last name.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.profileImage) {
      toast.error("Please upload a profile photo.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const registerForm = new FormData();
      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        toast.success("Account created successfully! Please log in. 🎉", { id: toastId });
        navigate("/login");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Registration failed. Email may already be in use.", { id: toastId });
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error("Registration error. Please check your connection.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='register'>
        <div className='register_content'>
          <form className='register_content_form' onSubmit={handleSubmit}>
            <input
              placeholder='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Password (min 6 characters)'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Confirm Password'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {!passwordMatch && (
              <p style={{ color: "#ef4444", fontSize: "13px" }}>Passwords do not match!</p>
            )}
            <input
              id='image'
              type='file'
              name='profileImage'
              accept='image/*'
              onChange={handleChange}
              required
              style={{ display: "none" }}
            />
            <label htmlFor='image'>
              <img src='/assets/addImage.png' alt='Add profile photo' />
              <p>{formData.profileImage ? "Change Profile Photo" : "Upload Your Photo"}</p>
            </label>

            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt='Profile preview'
                style={{ maxWidth: "80px", maxHeight: "80px", borderRadius: "50%", objectFit: "cover" }}
              />
            )}

            <button type='submit' disabled={!passwordMatch || loading}>
              {loading ? "CREATING ACCOUNT..." : "REGISTER"}
            </button>
          </form>
          <Link to='/login'>Already have an account? Log In here</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
