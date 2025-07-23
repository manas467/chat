'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../../components/LoginForm'

export default function AuthPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  // 🔧 Only redirect after login — avoid calling router.push during render
  useEffect(() => {
    if (user) {
      router.push('/chat')
    }
  }, [user, router])

  return <LoginForm onAuth={setUser} />
}
