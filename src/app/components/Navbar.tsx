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

  const homeButton = () => {
    router.push('/dashboard')
  }
  const statisticsButton = () => {
    router.push('/statistics')
  }

  const profileButton = () => {
    router.push('/profile')
  }

  return (
    <div className='bg-white py-4 px-6 flex justify-between items-center shadow-sm border-b border-gray-200'> 
      <Title/>
      <div className='flex gap-8'>
        <button className='nav-button' onClick={homeButton}>Home</button>
        <button className='nav-button' onClick={statisticsButton}>Statistics</button>
        <button className='nav-button' onClick={profileButton}>Profile</button>
        <button className='nav-button' onClick={handleLogout}><LogoutIcon fontSize="small" /></button>
      </div>
    </div>
  )
}

export default Navbar
