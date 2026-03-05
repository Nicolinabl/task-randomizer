import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../api'
import { useUserStore } from '../stores/useUserStore'
import { useQuestStore } from '../stores/useQuestStore'

export const LoginForm = () => {
    const fetchQuests = useQuestStore((state) => state.fetchQuests)
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

      if(!email.trim()) {
        setError('Please enter an email adress')
        return
      }

      if(!password.trim()) {
        setError('Please enter a password')
      }

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
          if (response.status === 401) {
            setError('Incorrect email or password')
          } else if (response.status === 404) {
            setError ('No account found with that email')
          } else {
            setError(data.message || 'Login failed. Please try again')
          }
          return
        }
  
        console.log('Login successful:', data)

        login({
          accessToken: data.accessToken,
          userId: data.userID,
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

        await fetchQuests(data.accessToken)
  
        // When signed up successfully -> redirect to profile page
        navigate('/')
  
      } catch (error) {
        console.error('Error:', error)
        setError('Something went wrong. Please try again')
      }
    }

  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <h2>Welcome Back! Log in now:</h2>
        {/* <label>
          Username
          <input type="text" placeholder="username" onChange={event => setName(event.target.value)}/>
        </label> */}
        <Label>
          email
          <Input type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
        </Label>
        <Label>
          Password
          <Input type="password" placeholder="password" onChange={event => setPassword(event.target.value)}/>
        </Label>
        {error && <p>{error}</p>}
        <Button type="submit">Log in</Button>
        <StyledLink to="/signup">Not a user? Click here to sign up</StyledLink>
      </Form>
    </main>
  )
}

const Form = styled.form`
  margin: 10px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #B594FF;
  background: #FFF;
  box-shadow: 2px 4px 4px 0 #DBDBDB;
  text-align: center;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: none;
  border-radius: 12px;
  padding: 15px 16px 14px 16px;
  background: #F4F0FF;
  margin: 16px 0;
  width: 100%;
  font-size: 16px;
`

const Button = styled.button`
  display: flex;
  height: 54px;
  width: 100%;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #1D30CE;
  background: var(--medium-purple);
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  color: white;
  font-family: "Pixelify Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--dark-purple);
  }

  &:active {
    background: var(--accent-purple);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 20px;
  display: block;

  &:hover{
    transform: scale(1.1)
  }
`