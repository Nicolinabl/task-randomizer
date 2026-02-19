import { QuestCard } from '../components/cards/QuestCard'

export const FriendFeed = () => {
  return (
    <>
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