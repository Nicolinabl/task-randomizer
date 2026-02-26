import { Header } from "../components/Header";
import styled from "styled-components";
import { CreateQuest } from "../components/CreateQuest";
import { QuestLibrary } from "../components/QuestLibrary";
import { Avatar } from "../components/Avatar";
import { Strike } from "../components/StrikeDisplay";
import { Link } from "react-router-dom";
import { QuestList } from "../components/QuestList";
import { useUserStore } from "../stores/useUserStore";

export const UserProfile = ( ) => {
  const user = useUserStore(state => state.user)
  
  return (
    <>
      <Header />
      <Div>
        <Strike />
        <Avatar />
        {user && <p>Hello, {user.email}!</p>}
        <Link to="/quests">Get quest of the day</Link>
        {/* TODO: modal for getting quest of the day */}
      </Div>
      <CreateQuest />
      <QuestList />
      {/* TODO: use socket.io to update questlist in real time without having to refresh page? */}
      <QuestLibrary />
      {/* NOTE: hide add quest + list of quests by default? Only show when user clicks button?  */}
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
