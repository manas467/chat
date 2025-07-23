// app/page.jsx

import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Chat App 🚀</h1>
      <p className="text-lg mb-10">Choose your chat experience</p>

      <div className="flex gap-6">
        <Link
          href="/chat"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
        >
          💬 Chat with Users
        </Link>

        <Link
          href="/ai-chat"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
        >
          🤖 Chat with AI
        </Link> 
          
        <LogoutButton/>
      </div>
     

      
    </div>
  )
}
