import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../api'
import { useUserStore } from '../stores/useUserStore'
import { useQuestStore } from '../stores/useQuestStore'

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
  const fetchQuests = useQuestStore((state) => state.fetchQuests)

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

      // When signed up successfully and quests are fetched -> redirect to profile page
      await fetchQuests(data.accessToken)
      navigate('/')

      // Clear the form inputs
        setName('')
        setEmail('')
        setPassword('')

    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong. Please try again')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign up here</h2>
      <Label>
        Username
        <Input type="text" placeholder="username" onChange={event => setName(event.target.value)}/>
      </Label>
      <Label>
        email
        <Input type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
      </Label>
      <Label>
        Password
        <Input type="password" placeholder="password" onChange={event => setPassword(event.target.value)}/>
      </Label>
      {error && <p>{error}</p>}
      <Button type="submit">Sign up</Button>
      <StyledLink to="/login">I already have an account</StyledLink>
    </Form>
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
  background: #866DEB;
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  color: white;
  font-family: "Pixelify Sans", sans-serif;
  font-size: 16px;
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

// TODO: This is only basic form and step 1/2. Add step 2 (add code sent to email to verify)
// TODO: when user signed up, also log in