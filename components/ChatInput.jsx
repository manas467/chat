'use client'

import { useState } from 'react'
import ChatWindow from './ChatWindow'

export default function ChatInput() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]) // store chat history
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMsg = { text: message, isUser: true }
    setMessages((prev) => [...prev, userMsg])
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      const aiMsg = { text: data.reply, isUser: false }

      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <ChatWindow messages={messages} loading={loading} />

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
