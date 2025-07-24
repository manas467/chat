export default function ChatHeader({ selectedUser }) {
  return (
    <header className="p-4 flex justify-between items-center bg-white">
      <div>
        <h3 className="text-lg font-bold">
          {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user'}
        </h3>
        <span className="text-sm text-green-400">● Online</span>
      </div>
    </header>
  )
}
