import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { FcDepartment, FcLeave } from 'react-icons/fc';
import { IoSettings } from 'react-icons/io5';

const AdminSidebar = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 w-64 h-screen space-y-2 text-white bg-gray-900'>
      <div className='flex items-center justify-center h-12 bg-[green]'>
        <h3 className='text-2xl text-center font-spacific'>StaffHub</h3>
      </div>
      
      <div className='px-4'>
        <NavLink to="/admin-dashboard" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FcDepartment />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FcLeave />
          <span>Leaves</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/setting" className={({isActive})=>`${isActive ? "bg-[orange] " : " "}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <IoSettings />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar;
