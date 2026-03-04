// import { apiUrl } from '../../api';
import styled from 'styled-components';
import { useEffect } from 'react';
import { QuestCard } from './cards/QuestCard';
import { useQuestStore } from '../stores/useQuestStore';


export const QuestList = () => {
  const { quests, error, isLoading, fetchQuests, deleteQuest, completeQuest } = useQuestStore()

  useEffect(() => {
    fetchQuests()
  }, [])

  if (isLoading) return <p>Loading quests...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <p>Your quests:</p>
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