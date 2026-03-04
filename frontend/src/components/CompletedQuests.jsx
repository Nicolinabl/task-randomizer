import { useQuestStore } from "../stores/useQuestStore"
import { QuestCard } from "./cards/QuestCard"

export const CompletedQuests = () => {
  const { quests, completeQuest } = useQuestStore()

  const completed = quests.filter(quest => quest.done === true)

  return (
    <>
      <h2>Completed quests</h2>
      {completed.map((quest) => (
          <QuestCard
            key={quest._id}
            id={quest._id}
            message={quest.message}
            done={quest.done}
            handleChecked={completeQuest}
          />
      ))}
    </>
  )
}