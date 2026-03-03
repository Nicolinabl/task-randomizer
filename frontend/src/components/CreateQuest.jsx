import styled from 'styled-components'
import { useState } from 'react'
// import { apiUrl } from '../../api'
import { useQuestStore } from '../stores/useQuestStore'

// component for creating quest
export const CreateQuest = () => {
  // state variables for form inputs
  const [message, setMessage] = useState('')
  const [timeNeeded, setTimeNeeded] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)

  const createQuest = useQuestStore((state) => state.createQuest)

  // Handle form submission
  const handleSubmit =  async (event) => {
    event.preventDefault()
    setError(null)

    if (!message.trim()) {
      setError('You need to add a quest')
      return
    }

    if (!timeNeeded) {
      setError('You need to add time needed')
    }

    const result = await createQuest(message, timeNeeded, category)

    if (!result.success) {
      setError(result.error)
      return
    }

    // After form i submitted, clear the input field
    setMessage('')
    setTimeNeeded('')
    setCategory('')

}

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create new quest</h2>
      <Label>
        What do you need to do?
        <Input 
          type="text" 
          placeholder='Quest' 
          value={message} 
          onChange={(event) => setMessage(event.target.value)}/>
        
        {/* <select 
          name="category" 
          value={category}
          onChange={(event) => setCategory(event.target.value)}
         >
          <option value="">Select a category</option>
          <option value="cleaning">Cleaning</option>
          <option value="exercise">Exercise</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select> */}
        {/* NOTE: category commented out for now. Not used currently */}

        <label>
          How many minutes will it take you?
          <Input 
            name="time" 
            type='number'
            placeholder='Time needed' 
            value={timeNeeded} 
            onChange={(event) => setTimeNeeded(event.target.value)} 
          />
        </label>

        {error && <p>{error}</p>}

        <Button type="submit">Add new quest</Button>
      </Label>
    </Form>
  )
}

const Form = styled.form`
  margin: 10px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #B594FF;
  background: #FFF;
  box-shadow: 2px 4px 4px 0 #DBDBDB;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border: none;
  border-radius: 12px;
  padding: 15px 16px 14px 16px;
  background: #F4F0FF;
  margin: 16px 0;
  width: 100%;
`

const Button = styled.button`
  display: flex;
  width: 315px;
  height: 54px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #1D30CE;
  background: #866DEB;
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  color: white;
`

// TODO: Add authentication check - redirect to login if no accessToken