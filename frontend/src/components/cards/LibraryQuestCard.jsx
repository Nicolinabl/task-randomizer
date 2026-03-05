import styled from "styled-components";

export const LibraryQuestCard = ({
  message,
  timeNeeded,
  category,
  onAdd,
  id,
}) => {
  return (
    <Container>
      <Div>
        <div>
          <P>{message}</P>
          {/* <p>Category: {category}</p> */}
          <ChipContainer>
            <TimeP>{timeNeeded} min</TimeP>
          </ChipContainer>
        </div>
      </Div>
      <ButtonAdd onClick={() => onAdd(id)}>+</ButtonAdd>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 8px 16px;
  margin: 4px auto;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 12px;
  border: 1px solid var(--accent-color);

  background-color: var(--main-white);
  box-shadow: 0 2px 2px 0 #dbdbdb;
`;

const P = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

const ChipContainer = styled.div`
  width: fit-content;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  background: var(--light-pink);
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

const ButtonAdd = styled.button`
  display: flex;
  width: 44px;
  height: 44px;
  min-height: 44px;
  min-width: 44px;
  padding: 4px;
  justify-content: center;
  align-items: center;

  border-radius: 100%;
  border: none;

  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--main-white);

  background-color: var(--secondary-button-color);

  /* Small shadow */
  box-shadow: 0 2px 2px 0 #dbdbdb;

  &:hover {
    background: var(--accent-color)
  }

  &:active {
    background: #E48187;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 5px;
`;
