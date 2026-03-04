import styled from 'styled-components'

export const QuestCard = ({ message, category, timeNeeded, onDelete, id, handleChecked, done }) => {
  return (
    <Container>
      <Div>
        <input 
          type="checkbox" 
          checked={done}
          onChange={(event) => {
          console.log(event)
          handleChecked(id, event.target.checked)
          }}
        />      
        <div>
          <P>{message}</P>
          {/* <p>Category: {category}</p> */}
          <TimeP>{timeNeeded} min</TimeP>
        </div>
      </Div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 5px 16px;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid var(--accent-color);
  background-color: #FFFFFF;
  box-shadow: 0 2px 2px 0 #DBDBDB;
  margin: 5px 10px;

`

const P = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`

const TimeP = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--accent-color);
  margin: 0;
`

const Div = styled.div`
  display: flex;
  gap: 5px;
`

// TODO hide/show list of tasks
// TODO change delete button to icon