import { CheckboxChecked } from "../icons/CheckboxChecked";
import { useQuestStore } from "../stores/useQuestStore";
import { QuestCard } from "./cards/QuestCard";
import styled from "styled-components";

export const CompletedQuests = () => {
  const { quests, completeQuest, deleteQuest } = useQuestStore();

  const completed = quests.filter((quest) => quest.done === true);

  return (
    <Container>
      <HeadingContainer>
        <CheckboxChecked />
        <h2>Completed quests</h2>
      </HeadingContainer>
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
  gap: 8px;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;

  align-self: stretch;
  border-radius: 12px;
  background: var(--main-white);
`;
