import LogoutButton from './LogoutButton'

export default function ChatHeader({ theme }) {
  return (
    <header
      className={`p-4 flex justify-between items-center ${
        theme === 'dark-gradient'
          ? 'bg-gradient-to-b from-indigo-900 to-indigo-700 text-white'
          : 'bg-white'
      }`}
    >
      <div>
        <h3 className="text-lg font-bold">Chat with Alice</h3>
        <span className="text-sm text-green-400">● Online</span>
      </div>

      <LogoutButton />
    </header>
  )
}
