import React, { useState, useEffect } from 'react';
import { columns,LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';


const Table = () => {
  const sampleLeaves = [
    { sno: 1, employeeId: 'EMP001', dep_name: 'IT', status: 'Pending' },
    { sno: 2, employeeId: 'EMP002', dep_name: 'HR', status: 'Approved' },
    { sno: 3, employeeId: 'EMP003', dep_name: 'Finance', status: 'Rejected' },
    { sno: 4, employeeId: 'EMP004', dep_name: 'IT', status: 'Pending' },
    { sno: 5, employeeId: 'EMP005', dep_name: 'HR', status: 'Approved' },
  ];

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    setLeaves(sampleLeaves);
    setFilteredLeaves(sampleLeaves);
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex items-center justify-between'>
        <input
          type="text"
          placeholder='Search By Emp Id'
          className='px-4 py-0.5 border border-blue-500'
          onChange={filterByInput}
        />
        <div className='space-x-3'>
          <button
            className='px-2 py-1 text-white bg-green-500 hover:bg-green-600'
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className='px-2 py-1 text-white bg-green-500 hover:bg-green-600'
            onClick={() => filterByButton("Approved")}
          >
            Approved
          </button>
          <button
            className='px-2 py-1 text-white bg-green-500 hover:bg-green-600'
            onClick={() => filterByButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>
      <div className='mt-3'>
        <DataTable columns={columns} data={filteredLeaves} pagination />
      </div>
    </div>
  );
};

export default Table;
