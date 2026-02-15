import styled from 'styled-components'

export const QuestCard = () => {
  return (
    <Div>
      <div>
        <h4>Name</h4>
      </div>
      <div>
        <p>Task:</p>
        <p>Time spent:</p>
        <p>Kudos: 🙌</p>
      </div>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 5px;
  border-radius: 12px;
`