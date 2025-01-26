import React, { useState,useEffect } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

   const [departments, setDepartments] = useState([]); 

   const [formData, setFormData] = useState({});

   const navigate = useNavigate();
   
  useEffect(() => {
    const getDepartments = async()=>{
    const departments = await fetchDepartments();
    setDepartments(departments);
    }
    getDepartments();
  },[]);

  const handleChange = async(e) => {
    const {name,value,files} = e.target;
    if(name === "image"){
      setFormData((prevData)=>({...prevData,[name]:files[0]}))
    }
    else{
      setFormData((prevData)=>({...prevData,[name]:value}))
    }
  }

  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key)=>{
      formDataObj.append(key,formData[key])
    })
    try{
      const response = await axios.post('http://localhost:5000/api/employee/add',formDataObj,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(response.data.success){
        navigate('/admin-dashboard/employees');
      }
    }
    catch(error){
       if(error.response && !error.response.data.success){
        alert(error.response.data.error)
       }
    }
  }

  
  return (
    <div className='max-w-4xl p-8 mx-auto bg-white rounded-md shadow-md mt-[15px]'>
      <h2 className='mb-6 text-2xl font-bold'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/*Name*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input onChange={handleChange} type="text" name="name" placeholder='Insert Name' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Email*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder='Insert Email' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Password*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder='*****' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Employee Id*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input onChange={handleChange} type="text" name="employeeId" placeholder='Employee ID' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Date of Birth*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input onChange={handleChange} type="date" name="dob" placeholder='DOB' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Gender*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select onChange={handleChange} name="gender" className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/*Marital Status*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select onChange={handleChange} name="maritalStatus" className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/*Designation*/}
          <div> 
            <label className='block text-sm font-medium text-gray-700'>Designation</label>
            <input onChange={handleChange} type="text" name="designation" placeholder='Designation' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

           {/*Department*/}
           <div>
            <label className='block text-sm font-medium text-gray-700'>Department</label>
            <select onChange={handleChange} name="department" className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Department</option>
                {departments.map(dep=>
                  <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                )}
            </select>
          </div>
          
          {/*Salary*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input onChange={handleChange} type="number" name="salary" placeholder='Salary' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

          {/*Role*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <select onChange={handleChange} name="role" className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/*Uplode Image*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Uplode Image</label>
            <input onChange={handleChange} type="file" name="image" placeholder='Uplode Image' accept='image/*' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>
        </div>
        
        <button type='submit' className='w-full py-2 mt-6 font-bold text-white bg-green-500 rounded hover:bg-green-600'>Add Employee</button>
      </form>
    </div>
  )
}

export default Add