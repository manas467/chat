'use client'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Sidebar() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUsers(usersData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <aside className="w-72 bg-gray-800 p-4 space-y-4">
      <h2 className="text-xl font-bold">Chats</h2>
      {users.length === 0 ? (
        <p className="text-sm text-gray-400">No users yet</p>
      ) : (
        users.map((u) => (
          <div key={u.id} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg">
            <img
              src={u.photoURL || '/avatar.png'}
              alt={u.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-400">{u.lastMessage || 'Say hi 👋'}</p>
            </div>
          </div>
        ))
      )}
    </aside>
  )
}
