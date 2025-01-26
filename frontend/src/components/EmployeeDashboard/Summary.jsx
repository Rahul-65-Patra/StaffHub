import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'


const SummaryCard = () => {
  const {user} = useAuth()
  return (
    <div className='p-5 rounded'>
    <div className='flex bg-white rounded'>

      <div className={`flex items-center justify-center px-4 text-3xl text-white bg-blue-800`}><FaUser/></div>

      <div className='py-1 pl-4'>
        <p className='text-lg font-semibold'>Welcome Back</p>
        <p className='text-xl font-bold'>{user.name}</p>
      </div>
    </div>
  </div>
  )
}

export default SummaryCard