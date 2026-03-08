import styled from "styled-components";
import { InfoCard } from "../components/cards/InfoCard";
import { Star } from "../components/icons/Star";
import { Heart } from "../components/icons/Heart";
import { Library } from "../components/icons/Library";
import { Dice } from "../components/icons/Dice";
import { Friends } from "../components/icons/Friends";
import { Linkedin } from "../components/icons/Linkedin";
import { GitHub } from "../components/icons/GitHub";
import { Link } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon";

export const Home = () => {
  return (
    <Main>
      <Div>
        <HeaderWrapper>
          <h1>Welcome!</h1>
          <p>Never spend energy on choosing your chores again</p>
          <HeartIcon></HeartIcon>
          <icon-svg></icon-svg>
        </HeaderWrapper>
        <ButtonDiv>
          <StyledLink to={"/login"}>
            <Button>Start your quest</Button>
          </StyledLink>
          <StyledLink to={"feed"}>
            <Button>Find your friends</Button>
          </StyledLink>
        </ButtonDiv>
      </Div>

      <h2>How it works</h2>

      <InfoCard
        icon={<Heart />}
        title="1. Add your own quests"
        description="Got something specific in mind? Add your own custom quests and how long they take to complete."
      />

      <InfoCard
        icon={<Library />}
        title="2. Don't know what to add?"
        description="Browse our quest library! Plenty of ideas for self-care, fitness, creativity, and productivity."
      />

      <InfoCard
        icon={<Dice />}
        title="3. Get a random daily quest from your list"
        description="Every day we pick a quest from your list. All you have to do is tell us how much time you have. And we'll roll the dice!"
      />

      <InfoCard
        icon={<Friends />}
        title="4. Keep keep streaks & share"
        description="Keep your avatar happy with daily streaks. Challenge friends and share your progress!"
      />

      <Div>
        <h2>Ready to quest?</h2>
        <p>Your avatar is waiting. Don't leave them hanging!</p>
        <StyledLink to={"login"}>
          <Button>Let's go!</Button>
        </StyledLink>
      </Div>

      <H3>Made by:</H3>
      <CreatorDiv>
        <NameDiv>
          <p>Nicolina</p>
          <LinksDiv>
            <Linkedin />
            <GitHub />
          </LinksDiv>
        </NameDiv>

        <NameDiv>
          <p>Julia</p>
          <LinksDiv>
            <Linkedin />
            <GitHub />
          </LinksDiv>
        </NameDiv>
      </CreatorDiv>
    </Main>
  );
};

export const Button = styled.button`
  display: flex;
  height: 54px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 2px solid var(--secondary-button-color);
  background: var(--accent-color);
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.3);
  margin: 20px 0;
  cursor: pointer;
  font-family: "Pixelify Sans", sans-serif;

  &:hover {
    background: var(--secondary-button-color);
  }

  &:active {
    background: #e48187;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CreatorDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const LinksDiv = styled.div`
  display: flex;
  gap: 5px;
`;

const NameDiv = styled.div`
  text-align: center;
`;

const H3 = styled.h3`
  font-family: "Pixelify Sans", sans-serif;
  font-size: 12px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: contents;
`;


