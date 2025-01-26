import { useNavigate } from "react-router-dom";


const columns = [
  {
    name: "Sno",
    selector: (row)=>row.sno,
    width:"70px"
  },
  {
    name: "Emp Id",
    selector: (row)=>row.employeeId,
    width:"110px"
  },
  {
    name: "Name",
    selector: (row)=>row.name,
    width:"120px"
  },
  {
    name: "Leave Type",
    selector: (row)=>row.leaveType,
    width:"140px",
  },
  {
    name: "Department",
    selector: (row)=>row.department,
    sortable: "true",
    width:"150px",
  },
  {
    name: "Days",
    selector: (row)=>row.days,
    width:"80px",
  },
  {
    name: "Status",
    selector: (row)=>row.status,
    width:"100px",
  },
  {
    name: "Action",
    cell: (row) => <LeaveButtons Id={row.employeeId} />,
    center:"true",
  },
]

const LeaveButtons = ({Id})=>{
  const navigate = useNavigate();

  const handleView =(id)=>{
    navigate(`admin-dashboard/leaves/${id}`)
  };

  return (
    <button onClick={()=>handleView(Id)} className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600">
      View
    </button>
  )
}

 export {columns,LeaveButtons}