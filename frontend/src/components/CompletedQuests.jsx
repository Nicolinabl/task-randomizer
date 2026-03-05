import { CheckboxChecked } from "../icons/CheckboxChecked";
import { useQuestStore } from "../stores/useQuestStore";
import { QuestCard } from "./cards/QuestCard";
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

export const CompletedQuests = () => {
  const { quests, completeQuest, deleteQuest } = useQuestStore();
  const [ isVisible, setIsVisible ] = useState(false)

  const completed = quests.filter((quest) => quest.done === true);

  return (
    <Container>
      <HeadingContainer>
        <CheckboxChecked />
        <h2>Completed:</h2>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  align-items: center;
  width: 100%;
`;

const HeadingContainer = styled.div`
  display: flex;
  height: 64px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
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
`;
