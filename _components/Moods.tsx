"use client"

import { saveOrUpdateMood } from '@/app/actions/mood';
import { getLocalDateString } from '@/app/utils/date';
import { getMoodList } from '@/app/utils/mood';
import { getMoodColor } from '@/app/utils/statistics';
import { MoodData } from '@/app/types/MoodData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { toast } from 'react-toastify';

type MoodsProps = {
  isToday: boolean
  changeDate: boolean
  moodData: Array<{ mood: string; mood_img: string; mood_date: string; mood_desc: string }>
}

function Moods({isToday, changeDate, moodData}: MoodsProps) {
  const [clickedMood, setClickedMood] = useState<MoodData>({mood: null,icon: null});
  const [moodDesc, setMoodDesc] = useState<string>("")

  useEffect(() => {

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

  },[changeDate,moodData])

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

  const queryClient = useQueryClient()

  const saveMoodMutation = useMutation({
    mutationFn: ({ mood, desc }: { mood: MoodData, desc: string }) => 
      saveOrUpdateMood(mood, desc),
    onSuccess: () => {
      toast.success("Save/Update successful!")
      const currentDate = getLocalDateString(new Date())
      localStorage.setItem('moodSavedDate', currentDate)
      // Cache'i güncelle
      queryClient.invalidateQueries({ queryKey: ['moods'] })
    },
    onError: (error: any) => {
      toast.error(error?.message || "Operation failed!")
    }
  })
  
  const handleSave = async () => {      
      saveMoodMutation.mutate({ mood: clickedMood, desc: moodDesc })
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
                  <Image 
                    src={m.icon} 
                    alt={`${m.label} Icon`} 
                    width={32}
                    height={32}
                    className="transition-all duration-300"
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
            disabled={!clickedMood.mood || saveMoodMutation.isPending || !isToday}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-102 disabled:scale-100 disabled:cursor-not-allowed shadow-md
              ${clickedMood.mood && !saveMoodMutation.isPending && isToday
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-purple-100' 
                : 'bg-gray-200 text-gray-400 shadow-gray-100'
              }`}
          >
            {saveMoodMutation.isPending ? (
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