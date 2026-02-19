import styled from 'styled-components'

export const QuestCard = ({ message, category, timeNeeded, onDelete, id }) => {
  return (
    <Div>
      <div>
        <h4>{message}</h4>
      </div>
      <div>
        <p>Category: {category}</p>
        <p>Time: {timeNeeded} min</p>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
`