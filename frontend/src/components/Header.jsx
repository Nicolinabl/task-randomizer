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
  width: 100vw;
  height: fit-content;
  gap: 8px;
  margin: 24px 20px;
  padding: 16px 16px;
  box-sizing: border-box;
`;
