import styled from "styled-components";

import { useUserStore } from "../stores/useUserStore";

export const Streak = () => {
  const { streak, isStreakLoading } = useUserStore();

  return (
    <StreakWrapper>
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
  font-size: 18px;
  color: #B594FF;
`;
