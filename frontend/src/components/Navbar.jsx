import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Hamburger from "hamburger-react";

export const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout(); // Call the logout function
    navigate("/"); // Redirect to homepage
  };

  return (
    <Nav>
      <HamburgerWrapper>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          direction="right"
          size={42}
          color="black"
          easing="ease-in"
          label="show menu"
          hideOutline={false}
        />
      </HamburgerWrapper>
      <NavMenu isOpen={isOpen}>
        <StyledLink to="/" onClick={() => isOpen(false)}>
          Home
        </StyledLink>
        {/* <StyledLink to="/profile" onClick={() => isOpen(false)}>
          Profile
        </StyledLink> */}
        <StyledLink to="/feed" onClick={() => isOpen(false)}>
          Friends
        </StyledLink>
        <StyledLink to="/about" onClick={() => isOpen(false)}>
          About
        </StyledLink>
        <StyledLink to="/login" onClick={() => isOpen(false)}>
          Log in
        </StyledLink>
        <button onClick={handleLogoutClick}>Log out</button>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  /*  display: flex;
  background-color: var(--primary-color);
  justify-content: space-between;
  padding: 5px; */
  background-color: var(--primary-color);
  padding: 8px 20px;
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* position: fixed;
  z-index: 10; */
`;
const HamburgerWrapper = styled.div`
  margin-left: auto;
  z-index: 100;
`;

const NavMenu = styled.div`
  background-color: aliceblue;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  //transition: transform 0.3s ease-in-out;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: auto;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
// TODO: change to hamburger on small screens
