import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { FcDepartment, FcLeave } from 'react-icons/fc';
import { IoSettings } from 'react-icons/io5';
import { useAuth } from '../../context/authContext';


const Sidebar = () => {
  
   const {user} = useAuth();

  return (
    <div className='fixed top-0 bottom-0 left-0 w-64 h-screen space-y-2 text-white bg-gray-900'>
      <div className='flex items-center justify-center h-12 bg-[green]'>
        <h3 className='text-2xl text-center font-spacific'>StaffHub</h3>
      </div>
      
      <div className='px-4'>
        <NavLink to="/employee-dashboard" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FcDepartment />
          <span>Leaves</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FcLeave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/employee-dashboard/setting" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <IoSettings />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar;
