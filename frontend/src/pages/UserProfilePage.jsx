import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'
import { CreateQuest } from '../components/CreateQuest'
import { QuestLibrary } from '../components/QuestLibrary'

export const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Div>
        🤩
        <button>Get quest of the day</button>
        {/* TODO: modal for getting quest of the day */}
      </Div>
      <CreateQuest />
      <QuestLibrary />
      {/* NOTE: hide add quest + list of quests by default? Only show when user clicks button?  */}
      
    </>
  )
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`