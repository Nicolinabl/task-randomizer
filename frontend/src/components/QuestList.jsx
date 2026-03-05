// import { apiUrl } from '../../api';
import styled from "styled-components";
import { useEffect } from "react";
import { QuestCard } from "./cards/QuestCard";
import { useQuestStore } from "../stores/useQuestStore";
import { useUserStore } from "../stores/useUserStore";
import { HeartAnimation } from "../assets/animation/Heart";

export const QuestList = () => {
  const { quests, error, isLoading, fetchQuests, deleteQuest, completeQuest } =
    useQuestStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchQuests();
  }, [user]);

  if (isLoading) return <p>Loading quests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <HeadingContainer>
        <HeartAnimation />
        <h2>My quests:</h2>
      </HeadingContainer>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 24px 0 24px;
  align-items: center;
`;

const HeadingContainer = styled.div`
  display: flex;
  height: 64px;
  padding: 0 16px;
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;

  align-self: stretch;
  border-radius: 12px;
  background: var(--main-white);
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
