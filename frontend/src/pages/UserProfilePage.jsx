import { Header } from "../components/Header";
import styled from "styled-components";
import { CreateQuest } from "../components/CreateQuest";
import { QuestLibrary } from "../components/QuestLibrary";
import { Avatar } from "../components/Avatar";
import { Strike } from "../components/StrikeDisplay";
import { Link } from "react-router-dom";
import { QuestList } from "../components/QuestList";
import { useUserStore } from "../stores/useUserStore";

export const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {!user && <p>Log in to see your profile</p>}

      {user && (
        <>
          <Header />

          <Div>
            <Strike />
            <Avatar />
            <p>Hello, {user.email}!</p>
            <Link to="/quests">Get quest of the day</Link>
          </Div>

          <CreateQuest />
          <QuestList />
          <QuestLibrary />
        </>
      )}
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// FIXME: change what content is showed depending on logged in or logged out user
