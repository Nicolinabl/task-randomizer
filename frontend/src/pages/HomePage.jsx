import { Header } from "../components/Header";
import styled from "styled-components";
import { CreateQuest } from "../components/CreateQuest";
import { QuestLibrary } from "../components/QuestLibrary";
import { apiUrl } from "../../api";

export const Home = () => {
  return (
    <PageWrapper>
      <Header />
      <Div>
        <p>Motivational things</p>
      </Div>
      <CreateQuest />
      <Div>
        <p>Motivational things</p>
      </Div>
      <QuestLibrary />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Div = styled.div`
  display: flex;
  background-color: var(--accent-color);
  justify-content: center;
`;

// TODO: This is home page for logged out user. Decide what to keep there. Simplify?
