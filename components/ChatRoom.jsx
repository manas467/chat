'use client'
import { useState, useEffect, useRef } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../lib/firebase'

export default function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const [user] = useAuthState(auth)
  const dummy = useRef()

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!user || !formValue.trim()) return

    await addDoc(collection(db, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
    })

    setFormValue('')
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-600">
        Please sign in to use the chat.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} user={user} />
        ))}
        <span ref={dummy}></span>
      </div>

      {/* Chat Input */}
      <form
        onSubmit={sendMessage}
        className="flex p-3 border-t bg-white"
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  )
}

function ChatMessage({ message, user }) {
  const { text, uid, displayName } = message
  const isUser = uid === user.uid
  const alignment = isUser ? 'justify-end' : 'justify-start'
  const bubbleStyle = isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'

  return (
    <div className={`flex ${alignment}`}>
      <div className="max-w-xs">
        {!isUser && (
          <p className="text-sm text-gray-500 mb-1">{displayName || 'Unknown'}</p>
        )}
        <div className={`px-4 py-2 rounded-xl shadow ${bubbleStyle}`}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
