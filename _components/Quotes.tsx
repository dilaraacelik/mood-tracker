"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'


type Quote = {
  content: string;
  author: string;
  tags: string[];
  id: number;
}


function Quotes() {

    const [quote, setQuotes] = useState<Quote | null>(null);

    const getCurrentDate = () => {
      let day = new Date().getDay().toString().padStart(2,'0')
      let month = new Date().getMonth().toString().padStart(2,'0')
      let year = new Date().getFullYear().toString()

      return `${day}-${month}-${year}`
    }
    
    const fetchQuotes = async () => {
      try {
          const response = await axios.get<Quote>("https://api.quotable.io/random",{
            headers: {
              Accept: "application/json"
            }
          })
          console.log('Veri: ', response.data.content)
          setQuotes(response.data)

          if (typeof window !== 'undefined') {
            localStorage.setItem('quoteDate', getCurrentDate())
            localStorage.setItem('quote', JSON.stringify(response.data))
          }

      } catch(err) {
          console.error('Quote fetch error:', err)
          // Fallback quote
          const fallbackQuote: Quote = {
            content: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            tags: ["motivational"],
            id: 1
          }
          setQuotes(fallbackQuote)
      }
    }

    useEffect(() => {
      // Client-side check
      if (typeof window === 'undefined') return;
      
      let quoteDate = localStorage.getItem('quoteDate')
      let dailyQuote = localStorage.getItem('quote')
      
      if(quoteDate === getCurrentDate() && dailyQuote){
        console.log('kayıt edilen quote')
        try {
          setQuotes(JSON.parse(dailyQuote))
        } catch (error) {
          console.error('Quote parse error:', error)
          fetchQuotes()
        }
      }
      else{
        console.log('yeni quote')
        fetchQuotes()
      }
      
      const interval = setInterval(() =>{
        if (typeof window === 'undefined') return;
        const currentQuoteDate = localStorage.getItem('quoteDate');
        if(currentQuoteDate !== getCurrentDate())
          fetchQuotes()
      }, 60 * 1000)

      return () => clearInterval(interval);
    }, [])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md max-w-lg mx-auto">
      {quote ? (
        <>
          <p className='text-gray-800 text-lg italic leading-relaxed mb-4 text-center'>"{quote.content}"</p>
          <p className='text-gray-600 text-sm font-medium text-right'>— {quote.author}</p>
        </>
      ) : (
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 ml-auto"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quotes
