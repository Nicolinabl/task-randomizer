import { LibraryQuestCard } from "./cards/LibraryQuestCard";
import { useEffect } from "react";
import { useQuestStore } from "../stores/useQuestStore";
import styled from "styled-components";
import questLibrary from "../library.json";
import HeartIcon from "../icons/HeartIcon";

export const QuestLibrary = () => {
  const { fetchLibraryQuests, libraryQuests, duplicateQuest, createQuest } =
    useQuestStore();

  const handleAdd = (quest) => {
    createQuest(quest.message, quest.timeNeeded, quest.category);
  };

  return (
    <Container>
      <HeadingContainer>
        <HeartIcon />
        <h2>Add task from library:</h2>
      </HeadingContainer>
      {questLibrary.map((quest, index) => (
        <LibraryQuestCard
          key={index}
          id={index}
          message={quest.message}
          timeNeeded={quest.timeNeeded}
          category={quest.category}
          onAdd={() => handleAdd(quest)}
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

const P = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

const TimeP = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--accent-color);
  margin: 0;
`;

const Div = styled.div`
  display: flex;
  gap: 5px;
`;
