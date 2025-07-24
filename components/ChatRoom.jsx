'use client'
import { useState, useEffect, useRef } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../lib/firebase'
import ChatMessage from './ChatMessage'

export default function ChatRoom({ selectedUser }) {
  const [user] = useAuthState(auth)
  const [messages, setMessages] = useState([])
  const dummy = useRef()

  useEffect(() => {
    if (!user || !selectedUser) return

    const q = query(collection(db, 'messages'), orderBy('createdAt'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(
          msg =>
            (msg.from === user.uid && msg.to === selectedUser.uid) ||
            (msg.from === selectedUser.uid && msg.to === user.uid)
        )

      setMessages(filtered)
    })

    return () => unsubscribe()
  }, [user, selectedUser])

  return (
    <div>
      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} user={user} />
      ))}
      <span ref={dummy}></span>
    </div>
  )
}
