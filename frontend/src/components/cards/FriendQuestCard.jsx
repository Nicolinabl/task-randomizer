import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { apiUrl } from "../../../api";
import { useUserStore } from "../../stores/useUserStore";

export const FriendQuestCard = ({
  id,
  message,
  createdBy,
  category,
  timeNeeded,
  doneAt,
  kudos,
  isNew,
}) => {
  const { user } = useUserStore();
  const [kudosCount, setKudosCount] = useState(kudos || 0);

  //conditional check?
  const handleClick = async () => {
    setKudosCount((prev) => prev + 1);

    try {
      const response = await fetch(apiUrl + `/quests/${id}/kudos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.accessToken,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Couldn't add kudos");
      }

      setKudosCount(data.response.kudos);
    } catch (err) {
      setKudosCount((prev) => prev - 1);
      console.error(err);
    }

    /* fetch(apiUrl + `/quests/${id}/kudos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setKudosCount(data.response.kudos);
        } else {
          setKudosCount((prev) => prev - 1);
          alert(data.message);
        }
      })
      .catch(() => {
        setKudosCount((prev) => prev - 1);
        console.error("Couldn't add kudos");
      }); */
  };

  return (
    <MainWrapper isNew={isNew}>
      <Cardheader>
        <Name>{createdBy.name || "User"}</Name>
        {/* <Avatar src={createdBy.moodUrl} alt={createdBy.name || 'User'} /> */}
        <ActionWrapper>
          <Button onClick={handleClick}>Kudos: {kudosCount}</Button>
        </ActionWrapper>
      </Cardheader>
      <QuestInfoWrapper>
        <TopInfo>
          <Quest>{message}</Quest>
          <Category>{category}</Category>
          <Time>{timeNeeded} min</Time>
        </TopInfo>
        <BottomRow>
          <Done>
            {new Date(doneAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Done>
        </BottomRow>
      </QuestInfoWrapper>
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
  background-color: #ffffff;
  margin: 4px;
  padding: 12px 12px;
  border-radius: 12px;
  width: 100%;
  border: 1px solid var(--accent-color);
`;

const Cardheader = styled.div`
  display: flex;
  background-color: var(--main-bg-color);
  justify-content: space-between;
  margin: 0;
  padding: 5px;
  border-radius: 12px;
`;

const Name = styled.h1`
  font-size: 15px;
  font-weight: 700;
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
  padding: 5px;
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
  font-size: 12px;
  font-weight: 400;
`;

const TimeP = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--medium-purple);
  margin: 0;
`;

const Done = styled.div`
  font-size: 10px;
  font-weight: 400;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 2px solid #e9628c;
  background: #f497b4;
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.3);
  cursor: pointer;
  font-family: "Pixelify Sans", sans-serif;

  /* Small shadow */
  box-shadow: 0 1px 1px 0 #dbdbdb;

  &:hover {
    background: var(--secondary-button-color);
  }

  &:active {
    background: #e48187;
  }
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
