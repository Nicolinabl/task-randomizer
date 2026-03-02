import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../api'
import { useUserStore } from '../stores/useUserStore'


export const SignupForm = () => {
  // State variables to store form input values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // State to store and display error messages
  const [error, setError] = useState(null)

  // Hook to navigate to different routes
  const navigate = useNavigate()

  const login = useUserStore((state) => state.login)

  // When form is submitted, this function runs
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter a username.')
      return
    }
  
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
  
    if (!password.trim()) {
      setError('Please enter a password.')
      return
    }
  
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    try {
      // send post request to signup endpoint with user data
      const response = await fetch(apiUrl + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()
      console.log('Server response data:', data)

      // check if response is unsuccessful
      if (!response.ok) {
        if (response.status === 409) {
          setError('An account with that email already exists.')
        } else {
          setError(data.message || 'Signup failed. Please try again.')
        }
        return
      } 

      console.log('Signup successful:', data)

      // // Store the access token in browser's localStorage for future requests
      // localStorage.setItem('accessToken', data.accessToken)
      // // Store the user ID
      // localStorage.setItem('userId', data.id)
      // // Store username
      // localStorage.setItem('userName', name)
      // // store email
      // localStorage.setItem('userEmail', email)

      // on signup also login
      login({
        accessToken: data.accessToken,
        userId: data.id,
        email: email,
        name: name
      })

      // Clear the form inputs
        setName('')
        setEmail('')
        setPassword('')

      // When signed up successfully -> redirect to profile page
      navigate('/profile')

    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong. Please try again')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign up here</h2>
      <label>
        Username
        <input type="text" placeholder="username" onChange={event => setName(event.target.value)}/>
      </label>
      <label>
        email
        <input type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
      </label>
      <label>
        Password
        <input type="password" placeholder="password" onChange={event => setPassword(event.target.value)}/>
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Sign up</button>
      <Link to="/login">I already have an account</Link>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
`

// TODO: This is only basic form and step 1/2. Add step 2 (add code sent to email to verify)
// TODO: when user signed up, also log in