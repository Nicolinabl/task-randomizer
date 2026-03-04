import styled from "styled-components";
import { Checkbox } from "../Checkbox";

export const QuestCard = ({
  message,
  category,
  timeNeeded,
  onDelete,
  id,
  handleChecked,
  done,
}) => {
  return (
    <Container>
      <Div>
        <Checkbox
          checked={done}
          onChange={(event) => handleChecked(id, event.target.checked)}
        />
        {/* <input
          type="checkbox"
          checked={done}
          onChange={(event) => {
            console.log(event);
            handleChecked(id, event.target.checked);
          }}
        /> */}
        <div>
          <P>{message}</P>
          {/* <p>Category: {category}</p> */}
          <ChipContainer>
            <TimeP>{timeNeeded} min</TimeP>
          </ChipContainer>
        </div>
      </Div>
      <ButtonDelete onClick={() => onDelete(id)}>Delete</ButtonDelete>
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

const Div = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
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
  background: #ffe2f3;
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

const ButtonDelete = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #6d48fe;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: var(--main-white);

  /* Small shadow */
  box-shadow: 0 1px 1px 0 #dbdbdb;
`;

// TODO hide/show list of tasks
// TODO change delete button to icon
