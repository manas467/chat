
import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'




export default function Sidebar({ onSelectUser }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = snapshot.docs.map(doc => doc.data())
      setUsers(userList)
    })

    return () => unsubscribe()
  }, [])

  return (
    <aside className="w-72 bg-gray-800 p-4 space-y-4 text-white">
      <h2 className="text-xl font-bold">Chats</h2>
      {users.map((u) => (
        <div
          key={u.uid}
          className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          onClick={() => onSelectUser(u)}
        >
          <img src={u.photoURL || '/avatar.png'} alt={u.name} className="w-10 h-10 rounded-full" />
          <div>{u.name}</div>
        </div>
      ))}
    </aside>
  )
}
