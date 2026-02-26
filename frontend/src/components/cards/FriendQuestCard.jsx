import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { apiUrl } from "../../../api";

export const FriendQuestCard = ({
  id,
  message,
  createdBy,
  category,
  timeNeeded,
  doneAt,
  kudos,
  accessToken,
  isNew,
}) => {
  const [kudosCount, setKudosCount] = useState(kudos || 0);

  //conditional check?
  const handleClick = () => {
    setKudosCount((prev) => prev + 1);

    fetch(apiUrl + `/quests/${id}/kudos`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization': accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setKudosCount(data.response.kudos);
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert("Couldn't add kudos");
      });
  };

  return (
    <MainWrapper isNew={isNew}>
      <Cardheader>
        <Name>{createdBy.name}</Name>
        <Avatar src={createdBy.moodUrl} alt={createdBy.name} />
      </Cardheader>
      <QuestInfoWrapper>
        <Quest>{message}</Quest>
        <Category>{category}</Category>
        <Time>{timeNeeded}</Time>
        <Done>
          {new Date(doneAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Done>
      </QuestInfoWrapper>
      <ActionWrapper>
        <p>Give kudos</p>
        <button onClick={handleClick}>Kudos: {kudosCount}</button>
      </ActionWrapper>
    </MainWrapper>
  );
};

// Styles

const slideIn = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 4px;
  padding: 12px 12px;
  border-radius: 12px;
`;

const Cardheader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 0;
  padding: 4px;
  border-radius: 12px;
`;

const Name = styled.h1`
  font-size: 14px;
  font-weight: 700;
  margin: 4px;
  padding: 12px 12px;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100%;
  object-fit: cover;
`;

const QuestInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const Quest = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const Category = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Time = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Done = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
