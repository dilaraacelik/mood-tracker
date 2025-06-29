"use client"

import React from 'react'

function Moods() {
  return (
    <div className='items-center flex flex-col'>
        <div className='flex flex-row justify-center'>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/happy.png" alt="Happy Icon" />
                  <span className='text-black text-xs'>Happy</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/sad.png" alt="Sad Icon" />
                  <span className='text-black text-xs'>Sad</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/angry.png" alt="Angry Icon" />
                  <span className='text-black text-xs'>Angry</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/neutral.png" alt="Neutral Icon" />
                  <span className='text-black text-xs'>Neutral</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/calm.png" alt="Calm Icon" />
                  <span className='text-black text-xs'>Calm</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/lover.png" alt="Lover Icon" />
                  <span className='text-black text-xs'>Lover</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/anxious.png" alt="Anxious Icon" />
                  <span className='text-black text-xs'>Anxious</span>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200 flex flex-col items-center'>
                  <img src="/icons/tired.png" alt="Tired Icon" />
                  <span className='text-black text-xs'>Tired</span>
                </button>
            </div>
        </div>
        <div className='m-4 flex flex-col'>
            <textarea 
                placeholder="Write Your Thoughts!" 
                className="placeholder-gray-500 shadow-2xl border-none w-[440px] h-[200px] text-black p-4 resize-none"
            />
            <div className='flex justify-end mt-3'>
                <button className='w-[90px] h-[35px] bg-indigo-500 hover:bg-indigo-600 text-white hover:w-[100px] hover:h-[45px] transition-all duration-200 rounded-md'>SAVE</button>
            </div>
        </div>
    </div>
  )
}

export default Moods
