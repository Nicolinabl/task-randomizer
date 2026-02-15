import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'
import { CreateQuest } from '../components/CreateQuest'
import { QuestLibrary } from '../components/QuestLibrary'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Div>
        <p>Motivational things</p>
      </Div>
      <CreateQuest />
      <Div>
        <p>Motivational things</p>
      </Div>
      <QuestLibrary />
    </>
  )
}

const Div = styled.div`
  display: flex;
  background-color: var(--accent-color);
  margin: 5px;
  justify-content: center;
`

// TODO: This is home page for logged out user. Decide what to keep there. Simplify? 
