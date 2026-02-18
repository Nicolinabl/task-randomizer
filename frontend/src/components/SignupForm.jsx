import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SignupForm = () => {
  return (
      <Form>
          <h4>Register new user</h4>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit">Register</button>
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