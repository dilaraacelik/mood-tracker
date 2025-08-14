"use client"

import { saveOrUpdateMood } from '@/app/actions/mood';
import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';

function Moods() {
  
  const [clickedMood, setClickedMood] = useState<MoodData>({mood: null,icon: null});
  const [moodDesc, setMoodDesc] = useState<string>("")

  useEffect(() => {
    const mood = localStorage.getItem('mood')
    const moodImg = localStorage.getItem('moodImg')
    const moodDesc = localStorage.getItem('moodDesc')

    setClickedMood({
      mood: mood ?? null,
      icon: moodImg ?? null
    });

    setMoodDesc(moodDesc ?? "");
  },[])


  const moodList = [
    { icon: "/icons/happy.png", label: "Happy" },
    { icon: "/icons/sad.png", label: "Sad" },
    { icon: "/icons/angry.png", label: "Angry" },
    { icon: "/icons/neutral.png", label: "Neutral" },
    { icon: "/icons/calm.png", label: "Calm" },
    { icon: "/icons/lover.png", label: "Lover" },
    { icon: "/icons/anxious.png", label: "Anxious" },
    { icon: "/icons/tired.png", label: "Tired" },
  ];


  const handleMood = (mood: string, iconPath: string) => {
    const isSameMood = clickedMood.mood === mood
    const newMood = isSameMood ? null : mood
    
    if(clickedMood.mood !== null)
      setMoodDesc("")

    setClickedMood(
      isSameMood 
        ? { mood: null, icon: null }
        : { mood, icon: iconPath }
    );

    if (!isSameMood) {
     localStorage.setItem('mood', newMood ?? "");
     localStorage.setItem('moodImg', iconPath ?? "")
     localStorage.setItem('moodDesc',"");
    } else {
      localStorage.setItem('mood', "");
     localStorage.setItem('moodImg', "")
      localStorage.setItem('moodDesc',"");
    }

  }

const handleSave = async () => {
    localStorage.setItem('moodDesc', moodDesc ?? "");

    const response = await saveOrUpdateMood(clickedMood, moodDesc);

    if (response?.status === 'success') {
        toast.success("Kayıt/Güncelleme başarılı!");
        const currentDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('moodSavedDate', currentDate);
    } else {
        toast.error(response?.message || "İşlem başarısız!");
    }
};

  return (
    <div className='items-center flex flex-col'>
        <div className="flex flex-row justify-center flex-wrap">
      {moodList.map((m) => (
        <div className="m-2" key={m.label}>
          <button
            onClick={() => handleMood(m.label, m.icon)}
            className={`h-10 flex flex-col items-center transition-all duration-200 hover:w-12 
              ${clickedMood.mood === m.label ? "w-12" : "w-10"}`}
          >
            <img src={m.icon} alt={`${m.label} Icon`} />
            <span className="text-black text-xs">{m.label}</span>
          </button>
        </div>
      ))}
    </div>
        <div className='m-4 flex flex-col'>
            <textarea 
                placeholder="Write Your Thoughts!"
                value={moodDesc}
                onChange={(e) => {
                  setMoodDesc(e.target.value)
                  }}
                className="placeholder-gray-500 shadow-2xl border-none w-[440px] h-[200px] text-black p-4 resize-none"
            />
            <div className='flex justify-end mt-3'>
              <button className={`w-[90px] h-[35px] rounded-md transition-all duration-200
                ${clickedMood.mood ? 'bg-indigo-500 hover:bg-indigo-600 text-white hover:w-[100px] hover:h-[45px]' : 'bg-gray-300 cursor-not-allowed'}`} onClick={handleSave}>SAVE</button>
            </div>
        </div>
    </div>
  )
}

export default Moods
