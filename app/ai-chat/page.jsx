'use client'

import ProtectedRoute from '../../components/ProtectedRoute'
import { useState } from 'react'

export default function AiChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      const aiReply = { sender: 'ai', text: data.reply }
      setMessages((prev) => [...prev, aiReply])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'AI response failed.' },
      ])
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="p-4 bg-indigo-600 text-white font-bold text-lg">Talk to AI</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-white border self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex p-4 bg-white border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-l-md focus:outline-none"
            placeholder="Ask something..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
