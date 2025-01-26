import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
//import AdminSummary from '../components/dashboard/AdminSummary';
import { Outlet, useNavigate } from 'react-router-dom';



const AdminDashboard = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Employee Dashboard if user is not an admin
    if (user?.role !== 'admin') {
      navigate('/employee-dashboard');
    }
  }, [user, navigate]);
  

  return (
   <div className='flex'>
    <AdminSidebar/>
    <div className='flex-1 h-screen ml-64 bg-gray-200'>
      <Navbar/>
      <Outlet/>
    </div>
   </div>
  )
}

export default AdminDashboard