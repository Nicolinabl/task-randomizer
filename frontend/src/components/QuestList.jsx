// import { apiUrl } from '../../api';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { QuestCard } from "./cards/QuestCard";
import { useQuestStore } from "../stores/useQuestStore";
import { useUserStore } from "../stores/useUserStore";
import { HeartAnimation } from "../assets/animation/Heart";
import { motion, AnimatePresence } from 'framer-motion'

export const QuestList = () => {
  const { quests, error, isLoading, fetchQuests, deleteQuest, completeQuest } =
    useQuestStore();
  const { user } = useUserStore();
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    fetchQuests();
  }, [user]);

  if (isLoading) return <p>Loading quests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <HeadingContainer>
        <HeartAnimation />
        <h2>My quests to conquer:</h2>
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </HeadingContainer>
      
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
        .filter((quest) => !quest.done)
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
    </Container>
  )
}
  
const Container = styled.div`
  padding: 10px 0;
  align-items: center;
  width: 100%;
`;

const HeadingContainer = styled.div`
  display: flex;
  height: 64px;
  padding: 0 16px;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  align-self: stretch;
  border-radius: 12px;
  background: var(--main-white);
`;

const Button = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #6d48fe;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: var(--main-white);

  /* Small shadow */
  box-shadow: 0 1px 1px 0 #dbdbdb;

  &:hover {
    background: var(--light-purple)
  }

  &:active {
    background: var(--accent-purple)
  }
`;

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: var(--primary-color);
//   margin: 10px;
//   border-radius: 12px;
// `

// 1. GET request from api to get all quests quests/all
// 2. map over quests, for each quest create a display of message, time and catagory
