import { Navbar } from '../components/Navbar'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  )
}

// TODO: Decide, for now login and signup are pages. Do we want it to be modals?