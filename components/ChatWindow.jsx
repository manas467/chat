export default function ChatWindow({ messages = [], loading }) {
  return (
    <div className="flex flex-col space-y-3 mb-4 max-h-[60vh] overflow-y-auto pr-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 rounded-xl ${
              msg.isUser
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-900 rounded-bl-none'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {loading && (
        <div className="text-sm text-gray-500 italic">AI is typing...</div>
      )}
    </div>
  )
}
