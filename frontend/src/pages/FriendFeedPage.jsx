import { QuestCard } from '../components/cards/QuestCard'
import { Navbar } from '../components/Navbar'

export const FriendFeed = () => {
  return (
    <>
      <Navbar />
      <h2>My friends finished quests</h2>
      <form>
        <label>
          Add friend:
          <input type="search" placeholder="Search 🔎"/>
        </label>
      </form>
      <QuestCard />
    </>
  )
}