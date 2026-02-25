import styled from 'styled-components'

export const Quests = () => {
  return (
    <>
        <Form>
          <h3>Get ready for your quest of the day!</h3>
          <Label>
            How much time do you have today?
            <select name="" id="">
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
              <option value="60">1 hour</option>
            </select>
          </Label>
          <button type="submit">Get quest</button>
          <button>Toss coin</button>
        </Form>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
  padding: 10px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`