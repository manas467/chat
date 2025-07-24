'use client'
import { useState } from 'react'

import Sidebar from '../../components/Sidebar'
import ChatHeader from '../../components/ChatHeader'
import ChatInput from '../../components/ChatInput'
import ChatWindow from '../../components/ChatWindow'
import ChatRoom from '../../components/ChatRoom'

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[300px] bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <Sidebar onSelectUser={setSelectedUser} />
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedUser={selectedUser} />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {selectedUser ? (
            <ChatRoom selectedUser={selectedUser} />
          ) : (
            <div className="text-center text-gray-500 mt-20">Select a user to start chatting</div>
          )}
        </div>
        {selectedUser && (
          <div className="p-4 bg-white border-t">
            <ChatInput selectedUser={selectedUser} />
          </div>
        )}
      </div>
    </div>
  )
}
