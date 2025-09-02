"use client"

import MainPage from "../../components/MainPage";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getMoods } from "@/app/actions/mood";
import { getLocalDateString } from "@/app/utils/date";
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const [isToday, setIsToday] = useState<boolean>(true)
  const [changeDate, setChangeDate] = useState<boolean>(true)

  const mood = useQuery({
    queryKey: ['moods'],
    queryFn: getMoods
  })
  
  useEffect(() => {
    const currentDate = new Date()
    localStorage.setItem("selectedDate", getLocalDateString(currentDate)); 
  },[])
 
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar/> 
      <div className="flex flex-1 h-full">
        <div className="w-1/3 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-lg">
            <Sidebar 
              setIsToday={setIsToday} 
              setChangeDate={setChangeDate} 
              changeDate={changeDate} 
              moodData={mood.data?.data || []}
            />
        </div>
        <div className="w-2/3 bg-gradient-to-br from-gray-50 to-white">
            <MainPage 
              isToday={isToday} 
              changeDate={changeDate} 
              moodData={mood.data?.data || []}
            />
        </div>
      </div>
    </div>
  );
}
