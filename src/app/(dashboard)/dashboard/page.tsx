"use client"

import MainPage from "../../components/MainPage";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getMoods } from "@/app/actions/mood";
import { getLocalDateString } from "@/app/utils/date";

export default function Home() {
  const [isToday, setIsToday] = useState<boolean>(true)
  const [changeDate, setChangeDate] = useState<boolean>(true)
  const [moodData, setMoodData] = useState<any[]>([])

  useEffect(() => {
    const currentDate = new Date()
    localStorage.setItem("selectedDate", getLocalDateString(currentDate)); 
    loadMoodData()
  },[])

  useEffect(() => {
    const currentDate = new Date()
    localStorage.setItem("selectedDate", getLocalDateString(currentDate)); 
    loadMoodData()
  },[MainPage])
  const loadMoodData = async () => {
    try {
      const response = await getMoods()
      if (response.status === 'success' && response.data) {
        setMoodData(response.data)
      }
    } catch (error) {
      console.error('Error loading mood data:', error)
    }
  }
 
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar/> 
      <div className="flex flex-1 h-full">
        <div className="w-1/3 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-lg">
            <Sidebar setIsToday={setIsToday} setChangeDate={setChangeDate} changeDate={changeDate} moodData={moodData}/>
        </div>
        <div className="w-2/3 bg-gradient-to-br from-gray-50 to-white">
            <MainPage isToday={isToday} changeDate={changeDate} moodData={moodData}/>
        </div>
      </div>
    </div>
  );
}
