import React from 'react'
import Moods from '../../../_components/Moods'

function MainPage() {
  return ( 
    <div className="h-full flex flex-col py-6">
      <div className='text-center mb-8'>
        <span className='text-black text-xl font-semibold'>How You Doin'?</span>
      </div>
      <div className='px-4 flex-1'>
        <Moods/>
      </div>
    </div>
  )
}

export default MainPage
