'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '../../../../utils/supabase/client'
import Title from '@/app/components/Title'

function ConfirmPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type')
      
      if (token_hash && type) {
        const supabase = createClient()
        
        try {
          const { error } = await supabase.auth.verifyOtp({
            type: type as 'signup' | 'email_change',
            token_hash,
          })
          
          if (error) {
            console.error('Email confirmation error:', error)
            router.push('/auth/auth-code-error')
          } else {
            // Success - redirect to dashboard
            router.push('/dashboard')
          }
        } catch (error) {
          console.error('Confirmation error:', error)
          router.push('/auth/auth-code-error')
        }
      } else {
        // Missing parameters
        router.push('/auth/auth-code-error')
      }
    }
    
    confirmEmail()
  }, [router, searchParams])

  return (
    <div className="h-screen relative overflow-hidden">
      {/* SAYFANIN SOL ÜST KÖŞESİNE HİZALI TITLE */}
      <div className="fixed top-4 left-4 z-50">
        <Title />
      </div>

      {/* LOADING MESSAGE ORTADA */}
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="text-indigo-500 text-6xl mb-4">📧</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Confirming Your Email
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              Please wait while we verify your email address...
            </p>
          </div>

          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="h-screen relative overflow-hidden">
        <div className="fixed top-4 left-4 z-50">
          <Title />
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 w-full max-w-md text-center">
            <div className="mb-6">
              <div className="text-indigo-500 text-6xl mb-4">📧</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Loading...
              </h1>
              <p className="text-gray-600 text-sm mb-6">
                Please wait while we load the confirmation page...
              </p>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <ConfirmPageContent />
    </Suspense>
  )
}
