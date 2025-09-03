import Navbar from '@/app/components/Navbar'
import StatisticsPage from '@/app/components/Statistics'
import React from 'react'

function Statistics() {
  return (
    <div className="h-screen flex flex-col overflow-auto">
        <Navbar/>
        <div className="flex-1 bg-gray-50">
            <StatisticsPage/>
        </div>
    </div>
  )
}

export default Statistics
