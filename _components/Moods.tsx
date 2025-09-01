"use client"

import { saveOrUpdateMood } from '@/app/actions/mood';
import { getLocalDateString } from '@/app/utils/date';
import { getMoodList } from '@/app/utils/mood';
import { getMoodColor } from '@/app/utils/statistics';
import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';

type MoodsProps = {
  isToday: boolean
  changeDate: boolean
  moodData: any[]
}

function Moods({isToday, changeDate, moodData}: MoodsProps) {
  console.log('🔄 Moods component render edildi, isToday:', isToday);
  const [clickedMood, setClickedMood] = useState<MoodData>({mood: null,icon: null});
  const [moodDesc, setMoodDesc] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useEffect(() => {
    console.log('today: ',isToday)
    if(isToday){
      const mood = localStorage.getItem('mood')
      const moodImg = localStorage.getItem('moodImg')
      const moodDesc = localStorage.getItem('moodDesc')
  
      const moodSavedDate = localStorage.getItem('moodSavedDate')
      const currentDate = getLocalDateString(new Date())
  
      if(moodSavedDate !== currentDate){
        localStorage.setItem('mood',"")
        localStorage.setItem('moodImg',"")
        localStorage.setItem('moodDesc',"")
      }
      
      setClickedMood({
        mood: mood && mood !== "" ? mood : null,
        icon: moodImg && moodImg !== "" ? moodImg : null
      });
  
      setMoodDesc(moodDesc && moodDesc !== "" ? moodDesc : "")
      
    }
    else{
      const selectedDate = localStorage.getItem('selectedDate');
      if (!selectedDate) return;

      console.log('Tarih',selectedDate)
      const moodEntry = moodData.find((m) =>
        m.mood_date === selectedDate
      )
      console.log('Mood: ',moodEntry)
      if(moodEntry){
          setClickedMood({
          mood: moodEntry.mood || null,
          icon: moodEntry.mood_img || null,
        });
        setMoodDesc(moodEntry.mood_desc || "");
      } else {
      // hiç mood kaydı yoksa temizle
      setClickedMood({ mood: null, icon: null });
      setMoodDesc("");
    }
      

    }
  },[changeDate])

  const handleMood = (mood: string, iconPath: string) => {
    const isSameMood = clickedMood.mood === mood
    
    if(clickedMood.mood !== null)
      setMoodDesc("")

    setClickedMood(
      isSameMood 
        ? { mood: null, icon: null }
        : { mood, icon: iconPath }
    );

  }

const handleSave = async () => {
    localStorage.setItem('mood', clickedMood.mood ?? "");
    localStorage.setItem('moodImg', clickedMood.icon ?? "")
    localStorage.setItem('moodDesc', moodDesc ?? "")
    setIsSaving(true)
    const response = await saveOrUpdateMood(clickedMood, moodDesc)

    if (response?.status === 'success') {
        toast.success("Kayıt/Güncelleme başarılı!")
        const currentDate = getLocalDateString(new Date())
        localStorage.setItem('moodSavedDate', currentDate)
        
    } else {
        toast.error(response?.message || "İşlem başarısız!")
    }
    setIsSaving(false)
}

  return (
    <div className='items-center flex flex-col space-y-8'>
      {/* Mood Selection Grid */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Select Your Mood</h3>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {getMoodList().map((m) => {
            const isSelected = clickedMood.mood === m.label
            const moodColor = getMoodColor(m.label)
            return (
              <div key={m.label} className="flex flex-col items-center">
                <button
                  onClick={() => handleMood(m.label, m.icon)}
                  disabled={!isToday}
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group
                    ${isSelected 
                      ? 'shadow-lg transform scale-105' 
                      : 'hover:shadow-md'
                    }`}
                  style={{
                    backgroundColor: isSelected ? moodColor : '#f8fafc',
                    border: `2px solid ${isSelected ? moodColor : '#e2e8f0'}`,
                  }}
                >
                  <img 
                    src={m.icon} 
                    alt={`${m.label} Icon`} 
                    className="w-8 h-8 transition-all duration-300"
                  />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
                <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  isSelected ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {m.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Textarea Section */}
      <div className='w-full max-w-lg flex flex-col space-y-4'>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Share your thoughts
          </label>
          <textarea 
            placeholder="What's on your mind today? How are you feeling?"
            disabled={!isToday}
            value={moodDesc}
            onChange={(e) => setMoodDesc(e.target.value)}
            className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 bg-white/80 backdrop-blur-sm resize-none shadow-sm"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {moodDesc.length}/500
          </div>
        </div>
        
        {/* Save Button */}
        <div className='flex justify-end'>
          <button 
            onClick={handleSave}
            disabled={!clickedMood.mood || isSaving || !isToday}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-102 disabled:scale-100 disabled:cursor-not-allowed shadow-md
              ${clickedMood.mood && !isSaving && isToday
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-purple-100' 
                : 'bg-gray-200 text-gray-400 shadow-gray-100'
              }`}
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              'Save Entry'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Moods
