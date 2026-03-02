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
    // CONTINUE FROM HERE
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => socket.off('message') // cleanup on unmount
  }, [])

  return (
    <>
      <ul></ul>
      <form>
        <input autoComplete="off" /><button>Send</button>
      </form>
    </>
  )
}