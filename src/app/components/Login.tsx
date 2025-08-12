'use client'

import { login } from '@/app/actions/auth'
import Title from '@/app/components/Title'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData(e.currentTarget)
        
        const response = await login(formData)
        
        if(response?.access_token){
            localStorage.setItem('accessToken', response.access_token)
            router.push('/dashboard')
        } else {
            console.error('Login failed:', response?.error)
        }
        
        setIsLoading(false)
    }

    return (
        <div className="h-screen relative overflow-hidden">
        {/* SAYFANIN SOL ÜST KÖŞESİNE HİZALI TITLE */}
        <div className="fixed top-4 left-4 z-50">
            <Title />
        </div>

        {/* FORM ORTADA */}
        <div className="flex justify-center items-center h-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">😊</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome Back!
                    </h1>
                    <p className="text-gray-600 text-sm">
                    Continue tracking your mood journey
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor='email'>
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                        required
                        id='email'
                        name='email'
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
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor='password'>
                        Password
                    </label>
                    <div className="relative">
                        <input
                        required
                        id='password'
                        name='password'
                        type="password"
                        className="text-black w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-400"
                        placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <span className="text-gray-400">🔒</span>
                        </div>
                    </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                    </div>

                    {/* Login Button */}
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50"
                    >
                    {isLoading ? 'Signing In...' : 'Sign In 🚀'}
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

                {/* Sign Up Link */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-xs">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                        Sign up now
                    </a>
                    </p>
                </div>
                </div>

            </div>

        </div>
    )
}
