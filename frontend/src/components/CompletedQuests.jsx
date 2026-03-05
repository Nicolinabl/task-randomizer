import { useQuestStore } from "../stores/useQuestStore"
import { QuestCard } from "./cards/QuestCard"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

export const CompletedQuests = () => {
  const { quests, completeQuest, deleteQuest } = useQuestStore()
  const completed = quests.filter(quest => quest.done === true)
  const [ isVisible, setIsVisible ] = useState(false)

  return (
    <>
      <h2>Completed quests</h2>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >

      {completed.map((quest) => (
          <QuestCard
            key={quest._id}
            id={quest._id}
            message={quest.message}
            done={quest.done}
            handleChecked={completeQuest}
            onDelete={deleteQuest}
          />
        ))}
        </motion.div>
      )}
    </AnimatePresence>
  </>
    )
  }