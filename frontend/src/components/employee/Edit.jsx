import React, { useState,useEffect } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

   const [employee, setEmployee] = useState({
    name:'',
    maritalStatus:'',
    designation:'',
    salary:0,
    departments:'',
    
   }); 
   const [departments, setDepartments] = useState(null);
   const navigate = useNavigate();
   const {id} = useParams()


   useEffect(() => {
    const getDepartments = async()=>{
    const departments = await fetchDepartments();
    setDepartments(departments);
    }
    getDepartments();
  },[]);
  
   
  useEffect(() => {
    const fetchEmployee = async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          const employee = response.data.employee;
          setEmployee((prev)=>({...prev,name:employee.userId.name,maritalStatus:employee.maritalStatus,designation:employee.designation,salary:employee.salary,department:employee.department}));
        }
      }
      catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
         }
      }
    }
    fetchEmployee();
  },[]);

  const handleChange = (e) => {
    const {name,value} = e.target;
      setEmployee((prevData)=>({...prevData,[name]:value}))
    }

  

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
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
    <>{departments && employee ? (
    <div className='max-w-4xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md'>
      <h2 className='mb-6 text-2xl font-bold'>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          
          {/*Name*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input onChange={handleChange} type="text" name="name" value={employee.name} placeholder='Insert Name' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

          {/*Marital Status*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select onChange={handleChange} name="maritalStatus" value={employee.maritalStatus} className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/*Designation*/}
          <div> 
            <label className='block text-sm font-medium text-gray-700'>Designation</label>
            <input onChange={handleChange} type="text" name="designation" value={employee.designation} placeholder='Designation' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

          {/*Salary*/}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input onChange={handleChange} type="number" name="salary" value={employee.salary} placeholder='Salary' className='block w-full p-2 mt-1 border border-gray-300 rounded-md' required />
          </div>

            {/*Department*/}
            <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>Department</label>
            <select onChange={handleChange} name="department" value={employee.department} className='block w-full p-2 mt-1 border border-gray-300 rounded-md'>
              <option value="">Select Department</option>
                {departments.map(dep=>
                  <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                )}
            </select>
          </div>
          </div>
        
        <button type='submit' className='w-full py-2 mt-6 font-bold text-white bg-green-500 rounded hover:bg-green-600'>Edit Employee</button>
      </form>
    </div>
    ) : (
    <div>Loading . . .</div>
  )}
  </>
  );
}


export default Edit