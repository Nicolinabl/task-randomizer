import styled from "styled-components";

import { useUserStore } from "../stores/useUserStore";

export const Streak = () => {
  const { streak, isStreakLoading } = useUserStore();

  return (
    <StreakWrapper>
      <h3>Daily streak:</h3>
      <h2>My streak:</h2>
      {isStreakLoading ? (
        <span>Loading...</span>
      ) : (
        <StreakNumber>{streak}</StreakNumber>
      )}
    </StreakWrapper>
  );
};

const StreakWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const StreakNumber = styled.span`
  font-weight: 700;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  line-height: normal;
  color: var(--dark-purple);
  background-color: var(--light-pink);
  padding: 2px 8px;
  border-radius: 4px;
`;
