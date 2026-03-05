// import { apiUrl } from '../../api';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { QuestCard } from './cards/QuestCard';
import { useQuestStore } from '../stores/useQuestStore';
import { useUserStore } from '../stores/useUserStore';
import { motion, AnimatePresence } from 'framer-motion'


export const QuestList = () => {
  const { quests, error, isLoading, fetchQuests, deleteQuest, completeQuest } = useQuestStore()
  const { user } = useUserStore()  
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    fetchQuests()
  }, [user])

  if (isLoading) return <p>Loading quests...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <h2>My quests</h2>
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
      
      {quests
        .filter(quest => !quest.done)
        .map((quest) => (
          <QuestCard
            key={quest._id}
            id={quest._id}
            message={quest.message}
            category={quest.category}
            timeNeeded={quest.timeNeeded}
            done={quest.done}
            onDelete={deleteQuest}
            handleChecked={completeQuest}
          />
        ))}
      </motion.div>
      )}
    </AnimatePresence>
    </>
  )
};

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: var(--primary-color);
//   margin: 10px;
//   border-radius: 12px;
// `

// 1. GET request from api to get all quests quests/all
// 2. map over quests, for each quest create a display of message, time and catagory