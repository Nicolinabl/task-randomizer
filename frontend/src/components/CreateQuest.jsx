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
        <input 
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
          <input 
            name="time" 
            type='number'
            placeholder='Time needed' 
            value={timeNeeded} 
            onChange={(event) => setTimeNeeded(event.target.value)} 
          />
        </label>

        {error && <p>{error}</p>}

        <button type="submit">Add a quest</button>
      </Label>
    </Form>
  )
}

const Form = styled.form`
  margin: 10px;
  background-color: var(--accent-color)
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

// TODO: Add authentication check - redirect to login if no accessToken