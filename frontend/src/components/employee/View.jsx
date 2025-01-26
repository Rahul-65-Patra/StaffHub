import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const View = () => {

  const {id}  = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee= async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          setEmployee(response.data.employee);
        }
      }
      catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
         }
      }
    }
    fetchEmployee();
  },[])



  return (
  
    <>{employee ? (
    <div className='max-w-3xl p-10 mx-auto bg-white rounded-md shadow-md mt-28'>
      <h2 className='mb-8 text-2xl font-bold text-center'>Employee Details</h2>
      
     <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      
      <div>
      <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="profileImage" className='border rounded-full w-72 h-72' />
     </div>
     
     <div>
      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Name:</p>
        <p className='font-medium'>{employee.userId.name}</p>
      </div>

      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Employee Id:</p>
        <p className='font-medium'>{employee.employeeId}</p>
      </div>

      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Date of Birth:</p>
        <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
      </div>

      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Gender:</p>
        <p className='font-medium'>{employee.gender}</p>
      </div>

      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Department:</p>
        <p className='font-medium'>{employee.department.dep_name}</p>
      </div>

      <div className='flex mb-5 space-x-3'>
        <p className='text-lg font-bold'>Marital Status:</p>
        <p className='font-medium'>{employee.maritalStatus}</p>
      </div>
      
     </div>
     </div>
     </div>
     ):<div>Loading . . .</div>}</>
  );
}

export default View