import React from 'react'


const SummaryCard = ({icon,text,number,color}) => {
  return (
    <div
    className={`p-6 text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${color}`}
  >
    <div className="flex items-center justify-between">
      <div className="text-5xl font-extrabold">{number}</div>
      <div>{icon}</div>
    </div>
    <p className="mt-4 text-lg font-semibold">{text}</p>
  </div>
  )
} 

export default SummaryCard