import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";
import "../../App.css";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-start h-[700px] p-3 bg-gradient-to-br from-blue-400 via-teal-400 to-emerald-500">

  {/* Animated Background Particles */}
  <div className="absolute inset-0 overflow-hidden -z-10">
    {Array(20)
      .fill()
      .map((_, i) => (
        <div
          key={i}
          className="absolute w-10 h-10 bg-white rounded-full opacity-20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 8 + 3}s`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `scale(${Math.random() + 0.3})`,
          }}
        ></div>
      ))}
  </div>

  {/* Dashboard Header */}
  <h3 className="text-4xl font-bold tracking-wider text-center text-Black">
    Dashboard Overview
  </h3>

  {/* Summary Cards */}
  <div className="grid w-full max-w-5xl grid-cols-1 gap-6 mt-10 md:grid-cols-3">
    <SummaryCard
      icon={<FaUsers className="text-3xl text-white" />}
      text="Total Employees"
      number={summary.totalEmployees}
      color="bg-gradient-to-r from-green-400 via-green-500 to-green-600"
    />
    <SummaryCard
      icon={<FaBuilding className="text-3xl text-white" />}
      text="Total Departments"
      number={summary.totalDepartments}
      color="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
    />
    <SummaryCard
      icon={<FaMoneyBillWave className="text-3xl text-white" />}
      text="Monthly Pay"
      number={summary.totalSalary}
      color="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
    />
  </div>

  {/* Leave Details */}
  <div className="w-full max-w-5xl mt-16">
    <h4 className="text-3xl font-bold text-center text-Black">
      Leave Details
    </h4>
    <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={<FaFileAlt className="text-3xl text-white" />}
        text="Leave Applied"
        number={summary.leaveSummary.appliedFor}
        color="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
      />
      <SummaryCard
        icon={<FaCheckCircle className="text-3xl text-white" />}
        text="Leave Approved"
        number={summary.leaveSummary.approved}
        color="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
      />
      <SummaryCard
        icon={<FaHourglassHalf className="text-3xl text-white" />}
        text="Leave Pending"
        number={summary.leaveSummary.pending}
        color="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
      />
      <SummaryCard
        icon={<FaTimesCircle className="text-3xl text-white" />}
        text="Leave Rejected"
        number={summary.leaveSummary.rejected}
        color="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
      />
    </div>
  </div>
</div>

  );
};

export default AdminSummary;
