import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Navbar = () => {
  return (
    <>
      <Nav>
        <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/feed'>Friends</StyledLink>
        <StyledLink to='/about'>About</StyledLink>
        <StyledLink to='/login'>Log in</StyledLink>
      </Nav>
    </>
  )
}

const Nav = styled.nav`
  display: flex;
  background-color: var(--primary-color);
  justify-content: space-between;
  max-width: 500px;
  padding: 5px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`