'use client'

import ProtectedRoute from '../../components/ProtectedRoute'
import Sidebar from '../../components/Sidebar'
import ChatHeader from '../../components/ChatHeader'
import ChatWindow from '../../components/ChatWindow'
import ChatInput from '../../components/ChatInput'

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[300px] bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Chats</h2>
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <ChatWindow />
          </div>
          <div className="p-4 bg-white border-t">
            <ChatInput />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
