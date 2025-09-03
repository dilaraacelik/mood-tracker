import React from 'react'
import Moods from '../../../_components/Moods'

type MainPageProps = {
  isToday: boolean
  changeDate: boolean
  moodData: Array<{ mood: string; mood_img: string; mood_date: string; mood_desc: string }>
}

function MainPage({isToday, changeDate, moodData}: MainPageProps) {
  return ( 
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Modern background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-20 -left-10 w-24 h-24 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-15 blur-xl"></div>
      </div>

      {/* Character image - repositioned to left side with fade effect */}
      <div 
        className="absolute top-20 left-8 w-64 h-64 bg-contain bg-no-repeat z-20 opacity-70 hidden lg:block" 
        style={{
          backgroundImage: "url('/JoeyTribbiani.png')",
          backgroundPosition: 'center top',
          filter: 'brightness(1.1) contrast(1.1)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        }}
      ></div> 
      
      {/* Main content */}
      <div className="h-full flex flex-col p-8 relative z-10">
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-black mb-2'>
            How You Doin&apos;?
          </h1>
          <p className='text-gray-600 text-lg'>Track your mood and thoughts for today</p>
        </div>
        
        {/* Mood selection area */}
        <div className='flex-1 flex items-center justify-center'>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 max-w-2xl w-full">
            <Moods isToday={isToday} changeDate={changeDate} moodData={moodData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
