import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  return (
    <>{leave ? (
      <div className='max-w-3xl p-10 mx-auto bg-white rounded-md shadow-md mt-28'>
        <h2 className='mb-8 text-2xl font-bold text-center'>Employee Details</h2>
        
       <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        
        <div>
        <img src={`http://localhost:5000/${leave.userId.profileImage}`} alt="profileImage" className='border rounded-full w-72 h-72' />
       </div>
       
       <div>
        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Name:</p>
          <p className='font-medium'>{leave.userId.name}</p>
        </div>
  
        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Employee Id:</p>
          <p className='font-medium'>{leave.employeeId}</p>
        </div>

        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Leave Type:</p>
          <p className='font-medium'>{leave.leaveType}</p>
        </div>

        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Reason:</p>
          <p className='font-medium'>{leave.reason}</p>
        </div>
        
        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Department:</p>
          <p className='font-medium'>{leave.department.dep_name}</p>
        </div>
  
        <div className='flex mb-5 space-x-3'> 
          <p className='text-lg font-bold'>Start Date:</p>
          <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
        </div>

        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>End Date:</p>
          <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
        </div>
  
        <div className='flex mb-5 space-x-3'>
          <p className='text-lg font-bold'>Action:</p>
          <button className='font-medium' onClick={()=>navigate(`/admin-dashboard/leaves${id}`)}>Accept</button>
          <button className='font-medium' onClick={()=>navigate(`/admin-dashboard/leaves/${id}`)}>Reject</button>
        </div>
        
       </div>
       </div>
       </div>
       ):<div>Loading . . .</div>}</>
  );
};

export default Detail;
