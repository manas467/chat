'use client'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function ChatInput({ selectedUser }) {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || !user || !selectedUser) return

    await addDoc(collection(db, 'messages'), {
      text: message,
      from: user.uid,
      to: selectedUser.uid,
      createdAt: serverTimestamp(),
    })

    setMessage('')
  }

  return (
    <form onSubmit={sendMessage} className="flex gap-2">
      <input
        className="flex-1 border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  )
}
