import { io } from 'socket.io-client'
import { apiUrl } from '../api'

export const socket = io(apiUrl)

