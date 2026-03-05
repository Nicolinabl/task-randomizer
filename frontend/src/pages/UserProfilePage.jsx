import { Header } from "../components/Header";
import styled from "styled-components";
import { CreateQuest } from "../components/CreateQuest";
import { QuestLibrary } from "../components/QuestLibrary";
import { Avatar } from "../components/Avatar";
//import { Strike } from "../components/StrikeDisplay";
import { Link } from "react-router-dom";
import { QuestList } from "../components/QuestList";
import { useUserStore } from "../stores/useUserStore";
import { CompletedQuests } from '../components/CompletedQuests'
import { Home } from "./HomePage";

export const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <PageWrapper>
      {!user && <Home />}

      {user && (
        <>
          <Header />

          <Div>
            <Avatar />
            <StyledLink to="/quests">Keep your avatar happy,<br></br> click here to get daily quest!</StyledLink>
          </Div>

          <QuestList />
          <CreateQuest />
          <QuestLibrary />
          <CompletedQuests />
        </>
      )}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  text-align: center;
`;

const H2 = styled.h2`
  margin: 0  0 30px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: "Pixelify Sans", sans-serif;
  margin-top: 10px;

  &:hover {
    transform: scale(1.1)
  }
`


// FIXME: change what content is showed depending on logged in or logged out user
