'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function HomePage() {
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    
    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Yönlendiriliyor...</p>
      </div>
    </div>
  )
}

export default HomePage
