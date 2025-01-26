import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const columns = [
  {
    name: "Serial No",
    selector: (row)=>row.sno,
  },
  {
    name: "Department Name",
    selector: (row)=>row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row)=>row.action,
    center:true
  },
]


 const DepartmentButtons =({Id,onDepartmentDelete})=>{

  const navigate = useNavigate()
  
  const handleDelete =async(id)=>{
    const confirm = window.confirm("Do you want to delete?")
    if(confirm){
    try {
      const response = await axios.delete(`http://localhost:5000/api/department/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        onDepartmentDelete()
      }
    } 
    catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
       }
    }
  }
  }
  
  return(
    <div className="flex space-x-4">
      <button className="px-3 py-1 text-white bg-green-600 rounded" onClick={()=>navigate(`/admin-dashboard/department/${Id}`)}>Edit</button>
      <button className="px-3 py-1 text-white bg-red-500 rounded" onClick={()=>handleDelete(Id)}>Delete</button>
    </div>
  )
 }

export {columns,DepartmentButtons}