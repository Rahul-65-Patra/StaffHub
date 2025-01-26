import React, { useContext } from 'react';
import '../App.css'
import {useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useAuth();
  const navigate = useNavigate();  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
       const response = await axios.post("http://localhost:5000/api/auth/login",{email,password});
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        if(response.data.user.role === "admin"){
           navigate('/admin-dashboard')
        }
        else{
          navigate('/employee-dashboard')
        }
      }
    } 
    catch(error){   
      if(error.response && !error.response.data.success){
        setError(error.response.data.error)
      }
      else{
        setError("Failed to login. Please check your credentials.")
      }
    }
    
  }
  
  
  return (
<div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
  {/* Background Bubbles */}
  <div className="absolute w-full h-full overflow-hidden">
    {Array(10).fill().map((_, i) => (
      <div
        key={i}
        className={`absolute w-16 h-16 bg-white rounded-full opacity-20 blur-md animate-bubble`}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          animationDelay: `${Math.random() * 2}s`,
          transform: `scale(${Math.random() * 1.5 + 0.5})`,
        }}
      ></div>
    ))}
  </div>

  {/* Main Content */}
  <h1 className="z-10 text-4xl font-bold tracking-wider text-white animate-bounce">StaffHub</h1>
  <div className="z-10 p-8 bg-white border shadow-lg rounded-2xl w-80">
    <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>
    {error && <p className="text-sm text-red-500">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email"
          id="email"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          id="password"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <label className="inline-flex items-center">
          <input type="checkbox" className="text-pink-500 border-gray-300 rounded form-checkbox focus:ring-pink-500" />
          <span className="ml-2 text-sm text-gray-700">Remember me</span>
        </label>
        <a href="#" className="text-sm text-pink-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>


  )
}

export default Login;
