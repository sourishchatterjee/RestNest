import React, { useState } from 'react'
import "../styles/Login.scss"
import { setLogin } from '../redux/state'
import {useDispatch} from "react-redux"
import {useNavigate} from   "react-router-dom"
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"


function LoginPage() {
const [email,setEmail]= useState("")
const [password,setPassword]=useState("")

const dispatch =useDispatch()
const navigate=useNavigate()

const handleSubmit = async (e) =>{
  e.preventDefault()

  try{
    const response =await fetch("http://localhost:3001/auth/login",{
      method :"POST",
      headers :{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email,password})
    })

  /* GEt data after fetching */
  const loggrdIn = await response.json()
 if(loggrdIn){
  dispatch(
    setLogin({
      user:loggrdIn.user,
      token: loggrdIn.token
    })
  )
   navigate("/")
 }


  }catch (err){
    console.log("Login failed", err.message)
  }
}

  return (
    <>
    <Navbar/>
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input 
          placeholder='Email'
          type='email' 
          value={email}
           required
           onChange={(e)=>setEmail(e.target.value)}
           />
          <input 
          type='password' 
          placeholder='Password' 
          value={password} 
          required
          onChange={(e)=>setPassword(e.target.value)}
          />
          <button type='submit'>LOG IN</button>
        </form>
       <a href='/register'>Don't have an account? Sign In Here</a>
      </div>

    </div>
    <Footer/>
    </>
  )
}

export default LoginPage