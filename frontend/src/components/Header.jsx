import styled from "styled-components";
import HeartIcon from "../icons/HeartIcon";
import { Streak } from "./StreakDisplay";
import { useUserStore } from "../stores/useUserStore";

export const Header = () => {
  const { user } = useUserStore();

  return (
    <HeaderWrapper>
      <h1>Welcome {user.email}</h1>
      <p>Never spend energy on choosing your chores again</p>
      <Streak />
      <HeartIcon></HeartIcon>
      <icon-svg></icon-svg>
      <HeadingContainer>
        <h1>Welcome to XxxxXXX</h1>
        <HeartIcon></HeartIcon>
        <Streak />
      </HeadingContainer>
      <p>Never spend energy on choosing your chores again</p>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  border: 2px solid var(--accent-purple);
  border-radius: 12px;
  background: var(--main-white);
  box-shadow: 2px 4px 4px 0 #dbdbdb;
  border: 2px solid #b594ff;

  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

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
const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
`;
