import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {

  const {user,logout} = useAuth();
  return (
    <div className='flex justify-between items-center text-white h-12 px-5 bg-[green]'>
      <p>Welcome {user.name}</p>
      <button onClick={logout} className='px-4 py-1 bg-green-500 rounded hover:bg-green-600'>Logout</button>
    </div>
  )
}

export default Navbar