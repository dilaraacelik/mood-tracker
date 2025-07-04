import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

function Signup() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">😊</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome!
        </h1>
        <p className="text-gray-600 text-sm">
          Start tracking your mood journey
        </p>
      </div>

      <form className="space-y-6">
        {/* Email Input */}
        <div >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              className="text-black w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-400"
              placeholder="example@email.com"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-gray-400">📧</span>
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="text-black w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-400"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-gray-400">🔒</span>
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="text-black w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-400"
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-gray-400">🔒</span>
            </div>
          </div>
        </div>
        
        {/* SignUp Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Sign Up 🚀
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Google Login */}
        <div className='flex justify-center'>
            <button className="btn btn-outline-dark d-flex align-items-center gap-2">
                <img src={"/icons/web_light_rd_na.svg"} alt="Google"/>
            </button>
        </div>
      </form>  

    </div>
  )
}

export default Signup
