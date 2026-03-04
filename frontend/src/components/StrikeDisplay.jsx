import styled from "styled-components";

export const Strike = () => {
  return (
    <StreakWrapper>
      <p>Daily strike:</p>
    </StreakWrapper>
  );
};

const StreakWrapper = styled.div`
  justify-content: flex-start;
  align-items: center;
`;
