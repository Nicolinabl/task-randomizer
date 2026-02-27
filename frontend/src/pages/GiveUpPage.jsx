import { Link } from "react-router-dom"
import styled from "styled-components"

export const GiveUp = () => {
  return (
    <Div>
      <p>please dont, you can at least try! 🥲</p>
      <StyledLink to="/quests"><Button>Ok, fine, ugh! take me back</Button></StyledLink>
      <StyledLink to='/profile'>I am really giving up... bye bye streak</StyledLink>
    </Div>
  )
}

// FIXME when clicking link to go back to quest you get to quest page but dont see the quest. fix so that user gets back to given quest and not quest form

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
  border: 2px solid var(--accent-color);
  padding: 16px;
  align-items: center;
`

const Button = styled.button`
  display: flex;
  height: 54px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 2px solid #E9628C;
  background: #F497B4;
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  margin-bottom: 16px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`