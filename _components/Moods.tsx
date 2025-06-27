"use client"

import React from 'react'

function Moods() {
  return (
    <div className='items-center flex flex-col'>
        <div className='flex flex-row justify-center'>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/happy.png" alt="Happy Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/sad.png" alt="Sad Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/angry.png" alt="Angry Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/neutral.png" alt="Neutral Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/calm.png" alt="Calm Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/lover.png" alt="Lover Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/anxious.png" alt="Anxious Icon"/>
                </button>
            </div>
            <div className='m-2'>
                <button className='w-10 h-10 hover:w-12 transition-all duration-200'>
                  <img src="/icons/tired.png" alt="Tired Icon"/>
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
