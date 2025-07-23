'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '../lib/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      let userCredential

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      }

      const user = userCredential.user

      // Save user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.email.split('@')[0],
        photoURL: user.photoURL || '',
        lastMessage: '',
        timestamp: serverTimestamp()
      }, { merge: true })

      // Navigate to chat
      router.push('/chat')
    } catch (err) {
      console.error('Firebase Error:', err.code)
      setError(err.code.replace('auth/', '').replace(/-/g, ' '))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isRegistering ? 'Create Account' : 'Login to ChatApp'}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center capitalize">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isRegistering ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
