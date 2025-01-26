import React, { useEffect } from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'
import {Outlet, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/authContext'



const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Admin Dashboard if user is not an employee
    if (user?.role !== 'employee') {
      navigate('/admin-dashboard');
    }
  }, [user, navigate]);
  
  return (
    <div className='flex'>
    <Sidebar/>
    <div className='flex-1 h-screen ml-64 bg-gray-200'>
      <Navbar/>
      <Outlet/>
    </div>
   </div>
  )
}

export default EmployeeDashboard