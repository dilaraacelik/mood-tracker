import React from 'react'
import Title from '@/app/components/Title'

export default function AuthCodeError() {
  return (
    <div className="h-screen relative overflow-hidden">
      {/* SAYFANIN SOL ÜST KÖŞESİNE HİZALI TITLE */}
      <div className="fixed top-4 left-4 z-50">
        <Title />
      </div>

      {/* ERROR MESSAGE ORTADA */}
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Email Confirmation Failed
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              The confirmation link is invalid or has expired. Please try registering again or contact support.
            </p>
          </div>

          <div className="space-y-3">
            <a 
              href="/register" 
              className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </a>
            <a 
              href="/login" 
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
