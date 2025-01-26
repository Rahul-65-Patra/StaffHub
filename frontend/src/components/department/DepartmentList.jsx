import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {columns,DepartmentButtons} from '../../utils/DepartmentHelper'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(true)
  const [filterdDepartments, setFilterdDepartments] = useState([])
  

  const onDepartmentDelete = ()=>{
    fetchDepartments();
  }

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/department',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })  
      if(response.data.success){
        let sno = 1;
        const data = await response.data.departments.map((dep)=>(
          {
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={()=>onDepartmentDelete(dep._id)}/>)
          }
        ))
        setDepartments(data)
        setFilterdDepartments(data)
      }
    } 
    catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
       }
    }
    finally{
      setDepLoading(false)
    }
  }
  
  useEffect(() => {
    fetchDepartments();
  },[])

  const filterDepartments=(e)=>{
    const records = departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilterdDepartments(records);
    
  }
  
  return (
    <>{depLoading ? <div>Loding ...</div> :
    <div className='p-5'>
      <div className='text-center'>
      <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>

      <div className='flex items-center justify-between'>
        <input onChange={filterDepartments} className='px-8 py-1 border border-blue-500 rounded outline-none ' type="text" placeholder='Search By Dept Name' />
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 text-white bg-green-600 rounded'>Add New Department</Link>
      </div>
      
      <div className='mt-5'>
        <DataTable columns={columns} data={filterdDepartments} pagination/>
      </div>
    </div>
  }</>
  )
}

export default DepartmentList