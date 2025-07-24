'use client'
export default function ChatMessage({ message, user }) {
  const isUser = message.from === user?.uid

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-white ${
          isUser ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
