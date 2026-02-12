import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Div>
        <p>Motivational things</p>
      </Div>
      <Div>
        <p>Motivational things</p>
      </Div>
    </>
  )
}

const Div = styled.div`
  display: flex;
  background-color: var(--accent-color);
  margin: 5px;
  justify-content: center;
`