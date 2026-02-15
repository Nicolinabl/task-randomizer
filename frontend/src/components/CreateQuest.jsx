import styled from 'styled-components'

export const CreateQuest = () => {
  return (
    <Form>
      <Label>
        Create new quest
        <input type="text" placeholder='Text input' />
        
        <select name="category" id="QuestCategory" >
          <option value="">Select a category</option>
        </select>

        <select name="time" id="QuestTime" >
          <option value="">Time needed</option>
        </select>

        <button type="submit">Add a quest</button>
      </Label>
    </Form>
  )
}

const Form = styled.form`
  margin: 5px;
  background-color: var(--accent-color)
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`