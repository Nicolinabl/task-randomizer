import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Hamburger from "hamburger-react";

export const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);

  const handleLogoutClick = () => {
    onLogout(); // Call the logout function
    setOpen(false);
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
        <StyledLink to="/" onClick={() => setOpen(false)}>
          Home
        </StyledLink>
        {/* <StyledLink to="/profile" onClick={() => isOpen(false)}>
          Profile
        </StyledLink> */}
        <StyledLink to="/feed" onClick={() => setOpen(false)}>
          Friends
        </StyledLink>
        <StyledLink to="about" onClick={() => setOpen(false)}>
          About
        </StyledLink>
        <StyledLink to="/login" onClick={() => setOpen(false)}>
          Log in
        </StyledLink>
        <LogoutButton onClick={handleLogoutClick}>
          <p>Log out</p>
        </LogoutButton>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: var(--medium-pink);
  padding: 8px 20px;
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  //position: fixed;
  left: 0;
  right: 0;
  z-index: 100;

  border-radius: 0 0 12px 12px;
  /* Basic shadow */
  box-shadow: 1px 2px 2px 0 #dbdbdb;
`;
const HamburgerWrapper = styled.div`
  margin-left: auto;
  z-index: 100;
`;

const NavMenu = styled.div`
  background-color: var(--primary-color);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: auto;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--main-text-color);

  &:hover {
    font-weight: 500;
    color: var(--dark-purple);
    transform: 1.2;
    transition: ease;
  }

  &:active {
    color: var(--secondary-button-color);
    transform: 0.85;
  }
`;

const LogoutButton = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid var(--medium-purple);
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: var(--medium-pink);

  &:hover {
    font-weight: 500;
    color: var(--dark-purple);
    transform: scale(1.1);
    transition: ease;
  }

  &:active {
    color: var(--secondary-button-color);
    transform: scale(0.85);
  }
`;
