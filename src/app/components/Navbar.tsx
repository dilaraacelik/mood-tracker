"use client"

import React from 'react'
import Title from './Title'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/app/actions/auth'
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await logout();

    if(response.error){
      console.error(response.error);
      return;
    }
    router.push('/login');
  }


  return (
    <div className='bg-white py-4 px-6 flex justify-between items-center shadow-sm border-b border-gray-200'> 
      <Title/>
      <div className='flex gap-8'>
        <button className='nav-button' onClick={() => router.push('/dashboard')}>Home</button>
        <button className='nav-button' onClick={() => router.push('/statistics')}>Statistics</button>
        <button className='nav-button' onClick={() => router.push('/profile')}>Profile</button>
        <button className='nav-button' onClick={handleLogout}><LogoutIcon fontSize="small" /></button>
      </div>
    </div>
  )
}

export default Navbar
