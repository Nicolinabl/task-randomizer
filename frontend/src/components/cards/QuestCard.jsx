import styled from 'styled-components'

export const QuestCard = ({ message, category, timeNeeded, onDelete, id, handleChecked, done }) => {
  return (
    <Div>
      <div>
        <h4>{message}</h4>
      </div>
      <div>
        <p>Category: {category}</p>
        <p>Time: {timeNeeded} min</p>
        <button onClick={() => onDelete(id)}>Delete</button>
        <input 
          type="checkbox" 
          checked={done}
          onChange={(event) => {
          console.log(event)
          handleChecked(id, event.target.checked)
        }}/>      
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