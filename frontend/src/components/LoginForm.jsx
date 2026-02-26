import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../api'
import { useUserStore } from '../stores/useUserStore'

export const LoginForm = () => {
    // State variables to store form input values
    // const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    // State to store and display error messages
    const [error, setError] = useState(null)
  
    // Hook to navigate to different routes
    const navigate = useNavigate()

    // Grabs login action from store
    const login = useUserStore((state) => state.login)
  
    // When form is submitted, this function runs
    const handleSubmit = async (event) => {
      event.preventDefault()
      setError(null)

      try {
        // send post request to signup endpoint with user data
        const response = await fetch(apiUrl + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        })
  
        const data = await response.json()
        console.log('Server response data:', data)
  
        // check if response is unsuccessful
        if (!response.ok) {
          setError(data.message)
          return
        }
  
        console.log('Login successful:', data)

        login({
          accessToken: data.accessToken,
          userId: data.id,
          email: email,
          name: data.name // check what the API actually returns here
        })
  
        // Store the access token in browser's localStorage for future requests
        // localStorage.setItem('accessToken', data.accessToken)
        // Store the user ID
        // localStorage.setItem('userId', data.id)
        // store user email
        // localStorage.setItem('userEmail', email)

        // Clear the form inputs
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
    <>
      <Form onSubmit={handleSubmit}>
        <h4>Welcome Back! Log in now:</h4>
        {/* <label>
          Username
          <input type="text" placeholder="username" onChange={event => setName(event.target.value)}/>
        </label> */}
        <label>
          email
          <input type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
        </label>
        <label>
          Password
          <input type="password" placeholder="password" onChange={event => setPassword(event.target.value)}/>
        </label>
        <button type="submit">Log in</button>
        <Link to="/signup">Not a user? Sign up</Link>
      </Form>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
`