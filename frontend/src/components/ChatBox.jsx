import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useUserStore } from '../stores/useUserStore'
import styled from 'styled-components'

const  socket = io(import.meta.env.VITE_API_URL || 'http://localhost:8080')

export const ChatBox = () => {
  const { user } = useUserStore()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  // const bottomRef = useRef(null) --> for auto scroll to latest message. Look into adding

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => socket.off('message') // cleanup on unmount
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (input) {
      socket.emit('message', input)
      setInput('')
    }
  }

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)} 
        />
        <button>Send</button>
      </form>
    </>
  )
}