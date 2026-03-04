import { Link } from "react-router-dom"
import styled from "styled-components"

export const GiveUp = () => {
  return (
    <Div>
      <h2>please dont, you can at least start! 🥲</h2>
      <StyledLink to="/quests"><Button>Ok, fine... take me back</Button></StyledLink>
      <Link to="/">Give up</Link>
    </Div>
  )
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    max-height: 280px;
    max-width: 350px;
    margin: 10px;
    border-radius: 12px;
    padding: 10px;
    border: 2px solid var(--accent-color);
    text-align: center;
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
  margin: 16px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1)
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`