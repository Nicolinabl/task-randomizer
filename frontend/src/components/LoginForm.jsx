import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  return (
    <>
      <Form>
          <h4>Welcome Back! Log in now:</h4>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
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