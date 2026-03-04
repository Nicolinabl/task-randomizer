import styled from "styled-components";
import HeartIcon from "../icons/HeartIcon";

export const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Welcome to XxxxXXX</h1>
      <HeartIcon></HeartIcon>
      <icon-svg></icon-svg>
      <p>Never spend energy on choosing your chores again</p>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  border-radius: 12px;
  background: var(--background-light-purple);
  box-shadow: 2px 4px 4px 0 #dbdbdb;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 8px;
  width: 100%;
  max-width: 800px;

  margin: 24px auto;
  padding: 16px 16px;

  box-sizing: border-box;

  @media (min-width: 768px) {
    margin: 24px auto;
  }
`;
