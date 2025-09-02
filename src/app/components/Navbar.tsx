"use client"

import React from 'react'
import Title from './Title'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/app/actions/auth'
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

function Navbar() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    try {
      // 1. localStorage'ı temizle
      localStorage.removeItem('accessToken');
      localStorage.removeItem('selectedDate');
      
      // 2. React Query cache'ini temizle
      queryClient.clear();
      
      // 3. Supabase logout
      await logout();
      
      router.push('/login'); 
      
    } catch (error) {
      console.error('Logout error:', error);
      // Hata olsa bile temizlik yap ve yönlendir
      localStorage.clear();
      queryClient.clear();
      router.push('/login');
    }
  }

  return (
    <div className='bg-white py-4 px-6 flex justify-between items-center shadow-sm border-b border-gray-200'> 
      <Title/>
      <div className='flex gap-8'>
        <button className='nav-button' onClick={() => router.push('/dashboard')}>Home</button>
        <button className='nav-button' onClick={() => router.push('/statistics')}>Statistics</button>
        <button className='nav-button' onClick={handleLogout}><LogoutIcon fontSize="small" /></button>
      </div>
    </div>
  )
}

export default Navbar
