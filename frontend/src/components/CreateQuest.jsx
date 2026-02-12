import styled from 'styled-components'

export const CreateQuest = () => {
  return (
    <Form>
      <fieldset>Create new quest
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button type="submit">Add a quest</button>
      </fieldset>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px;
`