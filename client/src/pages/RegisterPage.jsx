// import React, { useState } from 'react'
// import "../styles/Register.scss";



// function RegisterPage() {
// const [formData, setFormData]=useState({
//   firstName:"",
//   lastName: "",
//   email:"",
//   password:"",
//   confirmPassword:"",
//   profileImage: null,
// })
// const handleChange=(e)=>{
//   const {name,value,files} =e.target;
//   setFormData({
//     ...formData,
//     [name]:value,
//     [name]:name === "profileImage" ? files[0] :value
//   })
// }

// console.log(formData)

//   return (
//     <div className='register'>
//       <div className='register_content'>
//         <form className='register_content_form'>
//           <input
//           placeholder='First Name'
//           name='firstName'
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//           />

//           <input
//           placeholder='Last Name'
//           name='lastName'
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//           />

//           <input
//           placeholder='email'
//           name='email'
//           type='email'
//           value={formData.email}
//           onChange={handleChange}
//           required
//           />

//           <input
//           placeholder='Password'
//           name='password'
//           type='password'
//           value={formData.password}
//           onChange={handleChange}
//           required
//           />

//           <input
//           placeholder='Confirm Password'
//           name='confirmPassword'
//           type='password'
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//           />
//           <input 
//           id='image'
//           type='file'
//           name="profileImage" 
//           accept='image/' 
//           value={formData.profileImage}
//           onChange={handleChange}
//           required 
//           style={{display: "none"}}
//           />
//           <label htmlFor='image'>
//             <img  src='/assets/addImage.png' alt='add profile photo'/>
//             <p>Uplode Your Photo</p>
//           </label>
          
//           {formData.profileImage && (
//             <img
//               src={URL.createObjectURL(formData.profileImage)}
//               alt="profile photo"
//               style={{ maxWidth: "80px" }}
//             />
//           )}

//           <button type='submit'>REGISTER</button>
//         </form>
//         <a href='/login'>Already have an account?Log In here</a>

//       </div>
//     </div>
//   )
// }

// export default RegisterPage



// import React, { useEffect, useState } from 'react';
// import "../styles/Register.scss";
// import {useNavigate} from "react-router-dom"

// function RegisterPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//   });

//   const navigate =useNavigate()

//   const handleChange = (e) => {
//     const { name, value, files } = e.target; 
//     setFormData({
//       ...formData,
//       [name]:value,
//       [name]: name === "profileImage" ? files[0] : value, 
//     });
//   };

//   console.log(formData);

//   const [passwordMatch, setpasswordMatch] = useState(true)

//   useEffect(()=>{
//     setpasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword ==="")
//   })

//   const handleSubmit =async (e)=>{
//     e.preventDefault()

    

//     try {
//       const register_form = new FormData()
//       for(var key in formData){
//         register_form.append(key, formData[key])
//       }

//       const response =awit fetch("http://localhost:3001/auth/register",{
//         method:"POST",
//         body: register_form
//       })

//       if(response.ok){
//         navigate("/login")
//       }
//     } catch (err){
//       console.log("Registeration", err.message)
//     }
//   }

//   return (
//     <div className='register'>
//       <div className='register_content'>
//         <form className='register_content_form' onSubmit={handleSubmit}>
//           <input
//             placeholder='First Name'
//             name='firstName'
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Last Name'
//             name='lastName'
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='email'
//             name='email'
//             type='email'
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Password'
//             name='password'
//             type='password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder='Confirm Password'
//             name='confirmPassword'
//             type='password'
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//             {!passwordMatch &&(
//               <p style={{color:"red"}}>Passwords are not matched!</p>
//             )}
//           <input
//             id='image'
//             type='file'
//             name='profileImage'
//             accept='image/*' 
//             onChange={handleChange}
//             required
//             style={{ display: "none" }}
//           />
//           <label htmlFor='image'>
//             <img src='/assets/addImage.png' alt='add profile photo' />
//             <p>Upload Your Photo</p>
//           </label>

//           {formData.profileImage && (
//             <img
//               src={URL.createObjectURL(formData.profileImage)}
//               alt='profile photo'
//               style={{ maxWidth: "80px" }}
//             />
//           )}

//           <button type='submit' disabled={!passwordMatch}>REGISTER</button>
//         </form>
//         <a href='/login'>Already have an account? Log In here</a>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;



import React, { useEffect, useState } from 'react';
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

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
    
    try {
      const registerForm = new FormData();
      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
    }
  };

  return (
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
            placeholder='Password'
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
            <p style={{ color: "red" }}>Passwords do not match!</p>
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
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt='Profile preview'
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href='/login'>Already have an account? Log In here</a>
      </div>
    </div>
  );
}

export default RegisterPage;
