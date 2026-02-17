import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import styled from 'styled-components'
import { CreateQuest } from '../components/CreateQuest'
import { QuestLibrary } from '../components/QuestLibrary'
import { Avatar } from '../components/Avatar'
import { Strike } from '../components/StrikeDisplay'
import { Link } from 'react-router-dom'

export const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Div>
        <Strike />
        <Avatar />
        <Link to="/quests">Get quest of the day</Link>
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