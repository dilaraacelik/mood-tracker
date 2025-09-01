'use client'

import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import '../calender.css'
import Quotes from '../../../_components/Quotes'
import { getMoods } from '../actions/mood'
import { getMoodColor } from '../utils/statistics'
import { getLocalDateString } from '../utils/date'
import { getMoodList } from '../utils/mood'

type SidebarProps = {
  setIsToday: React.Dispatch<React.SetStateAction<boolean>>
  setChangeDate: React.Dispatch<React.SetStateAction<boolean>>
  changeDate: boolean
  moodData: any[]
}

function Sidebar({setIsToday, setChangeDate, changeDate, moodData}: SidebarProps) {

  // Belirli bir tarih için mood bilgisini bulma
  const getMoodForDate = (date: Date) => {
    const dateString = getLocalDateString(date)
    return moodData.find(mood => mood.mood_date === dateString)
  }

  // Takvim tile'ı için mood emoji'si gösterme
  const getTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view !== 'month') return null
    
    const mood = getMoodForDate(date)
    if (!mood) return null

    const moodIcon = getMoodList().find(m => m.label.toLowerCase() === mood.mood.toLowerCase())

    return (
      <div className="mood-emoji flex justify-center items-center mt-1">
        {moodIcon && (
          <img 
            src={moodIcon.icon} 
            alt={mood.mood}
            className="w-4 h-4 opacity-90 drop-shadow-sm"
          />
        )}
      </div>
    )
  }

  // Takvim tile'ı için arka plan rengi
  const getTileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view !== 'month') return null
    
    const mood = getMoodForDate(date)
    if (!mood) return null

    return `mood-tile mood-${mood.mood.toLowerCase()}`
  }

  return (
    <div className="h-full flex flex-col p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 to-purple-400"></div>
      
      {/* Header */}
      <div className='text-center mb-6'> 
        <h2 className='text-2xl font-bold text-black'>
          History
        </h2>
        <p className='text-sm text-gray-500 mt-1'>Track your mood journey</p>
      </div>
      
      {/* Calendar Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 mb-6 flex-shrink-0">
        <Calendar 
          className="custom-calendar"
          locale="en-US"
          tileContent={getTileContent}
          tileClassName={getTileClassName}
          onChange={(date) => {
            if (date instanceof Date) {
               // Yerel tarih string'i oluştur
               const localDateString = getLocalDateString(date);
               localStorage.setItem("selectedDate", localDateString); 
               
               // Bugünün yerel tarihini al
               const currentDate = new Date();
               const currentDateOnly = getLocalDateString(currentDate);
               
               if(currentDateOnly !== localDateString){
                 setIsToday(false);
                 setChangeDate(!changeDate)
                 console.log('Tarih farklı - isToday: false');
                 console.log('currentDateOnly', currentDateOnly);
                 console.log('selectedDateOnly', localDateString);
               } else {
                 setIsToday(true);
                 setChangeDate(!changeDate)
                 console.log('Tarih aynı - isToday: true');
                 console.log('currentDateOnly', currentDateOnly);
                 console.log('selectedDateOnly', localDateString);
               }
            }
          }}
        />
      </div>
      
      {/* Quote Section */}
      <div className="flex-1 flex items-end justify-center">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 shadow-lg border border-indigo-100 w-full">
          <Quotes/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
