import { Link } from "react-router-dom"
import styled from "styled-components"

export const GiveUp = () => {
  return (
    <PageWrapper>
      <Div>
        <h2>please dont, you can at least start! 🥲</h2>
        <StyledLink to="/quests"><Button>Ok, fine... take me back</Button></StyledLink>
        <Link to="/">Give up</Link>
      </Div>
    </PageWrapper>
  )
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--main-white);
    max-height: 280px;
    max-width: 350px;
    margin: 10px;
    border-radius: 12px;
    padding: 10px;
    border: 2px solid #B594FF;
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
  border-radius: 12px;
  border: 1px solid #1D30CE;
  background: var(--medium-purple);
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  color: white;
  font-family: "Pixelify Sans", sans-serif;
  margin: 15px 0;
  font-size: 20px;

  &:hover {
    background: var(--dark-purple)
  }

  &:active {
    background: var(--accent-purple)
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: contents;
`

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`