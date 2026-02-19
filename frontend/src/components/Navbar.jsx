import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const Navbar = ({ onLogout }) => {
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    onLogout()  // Call the logout function
    navigate('/')  // Redirect to homepage
  }

  return (
    <>
      <Nav>
        <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/profile'>Profile</StyledLink>
        <StyledLink to='/feed'>Friends</StyledLink>
        <StyledLink to='/about'>About</StyledLink>
        <StyledLink to='/login'>Log in</StyledLink>
        <button onClick={handleLogoutClick}>Log out</button>
      </Nav>
    </>
  )
}

const Nav = styled.nav`
  display: flex;
  background-color: var(--primary-color);
  justify-content: space-between;
  padding: 5px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`
// TODO: change to hamburger on small screens