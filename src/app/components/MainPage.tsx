import React from 'react'
import Moods from '../../../_components/Moods'

function MainPage() {
  return ( 
    <div className="h-full flex flex-col relative">
      {/* Background image in top corner */}
                      <div 
          className="absolute top-4 left-25 w-64 h-64 bg-contain bg-no-repeat z-0" //TODO: ekran küçülünce sorun oluşuyor
          style={{
            backgroundImage: "url('/JoeyTribbiani.png')",
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          }}
        ></div>
      
      {/* Main content */}
      <div className="h-full flex flex-col py-6 relative z-10">
        <div className='text-center mb-8 flex justify-center'>
          <span className='text-black text-xl font-semibold'>How You Doin'?</span>
        </div>
        <div className='px-4 flex-1'>
          <Moods/>
        </div>
      </div>
    </div>
  )
}

export default MainPage
