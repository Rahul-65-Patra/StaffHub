import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext';

const View = () => {

  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null)
  const {id}  = useParams()
  const {user} = useAuth();
  let sno = 1;

    const fetchSalaries= async () => {
    
      try {
        const response = await axios.get(`http://localhost:5000/api/salary/${id}/${user.role}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          setSalaries(response.data.salary);  
          setFilteredSalaries(response.data.salary);
        }
      }
      catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.message)
         }
      }
    };
    
    useEffect(() => {
      fetchSalaries();
    }, [])

    const filterSalaries=(q)=>{
      const filteredRecords = salaries.filter((leave)=>
      leave.employeeId.toLocalLowerCase().includes(q.toLocalLowerCase()));
      setFilteredSalaries(filteredRecords);
    }


    return (
      <>
        {filteredSalaries === null ? (
          <div>Loading...</div>
        ) : (
          <div className='p-5 overflow-x-auto'>
            
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>Salary History</h2>
            </div>
            
            <div className='flex justify-end my-3'>
              <input
                onChange={filterSalaries}
                type="text"
                placeholder='Search By Emp ID'
                className='border border-blue-500 px-2 rounded-md py-0.5 outline-none'
              />
            </div>
            
            {filteredSalaries.length > 0 ? (
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase border border-gray-200 bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3'>SNO</th>
                    <th className='px-6 py-3'>Emp ID</th>
                    <th className='px-6 py-3'>Salary</th>
                    <th className='px-6 py-3'>Allowance</th>
                    <th className='px-6 py-3'>Deduction</th>
                    <th className='px-6 py-3'>Total</th>
                    <th className='px-6 py-3'>Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr key={salary._id} className='bg-white border-b'>
                      <td className='px-6 py-3'>
                        {sno++} 
                      </td>
                      <td className='px-6 py-3'>
                        {salary.employeeId.employeeId}
                      </td>
                      <td className='px-6 py-3'>
                        {salary.basicSalary}
                      </td>
                      <td className='px-6 py-3'>
                        {salary.allowances}
                      </td>
                      <td className='px-6 py-3'>
                        {salary.deductions}
                      </td>
                      <td className='px-6 py-3'>
                        {salary.netSalary}
                      </td>
                      <td className='px-6 py-3'>
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Records</div>
            )}
          </div>
        )}
      </>
    );
    
  };
     
  export default View;