import React, { useState, useEffect } from "react";
import { fetchDepartments,getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId:null,
    basicSalary:0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-md shadow-md mt-[130px]">
          <h2 className="mb-6 text-2xl font-bold">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              
              {/*Department*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  onChange={handleDepartment}
                  name="department"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option value={dep._id} key={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/*employee*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  onChange={handleChange}
                  name="employeeId"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select Employee Id</option>
                  {employees.map((emp) => (
                    <option value={emp._id} key={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/*Designation*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="basicSalary"
                  placeholder="Basic Salary"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/*Salary*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="allowances"
                  placeholder="Allowances"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="deductions"
                  placeholder="Deductions"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="payDate"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-6 font-bold text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading . . .</div>
      )}
    </>
  );
};

export default Add;
