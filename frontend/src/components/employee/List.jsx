import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {columns,EmployeeButtons} from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";


const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true)
  const [filterdEmployees, setFilterdEmployees] = useState([])


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/employee',{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })  
        if(response.data.success){
          let sno = 1;
          const data = await response.data.employees.map((emp)=>(
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name:emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img className='w-10 h-10 rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`}/>,
              action: (<EmployeeButtons Id={emp._id}/>)
            }
          ))
          setEmployees(data)
          setFilterdEmployees(data);
        }
      } 
      catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
         }
      }
      finally{
        setEmpLoading(false)
      }
    }
    fetchEmployees();
  },[])


  const filterEmployees=(e)=>{
    const records = employees.filter((emp)=>emp.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilterdEmployees(records);
    
  }
  
  
  return (
    <>{empLoading ? <div>Loding ...</div> :
    <div className='p-5'>
      <div className='text-center'>
      <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>

      <div className='flex items-center justify-between'>
        <input onChange={filterEmployees} className='px-8 py-1 border border-blue-500 rounded outline-none ' type="text" placeholder='Search By Employe Name' />
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 text-white bg-green-600 rounded'>Add New Employee</Link>
      </div>
      
      <div className='mt-5'>
        <DataTable columns={columns} data={filterdEmployees} pagination/>
      </div>
    </div>
     }</>
  )
}

export default List