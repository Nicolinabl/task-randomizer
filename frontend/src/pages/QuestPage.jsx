import styled from 'styled-components'
import { useQuestStore } from '../stores/useQuestStore'
import { useUserStore } from '../stores/useUserStore'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Quests = () => {
const { quests, error, isLoading, fetchQuests, deleteQuest, completeQuest } = useQuestStore()
const { email, user } = useUserStore()
const [timeAvailable, setTimeAvailable] = useState('')
const [randomQuest, setRandomQuest] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchQuests()

    const filtered = quests.filter(quest => quest.timeNeeded <= Number(timeAvailable))
    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomQuest(random)
  }

  return (
    <>
      {!randomQuest && (
        <Form onSubmit={handleSubmit}>
          <h3>Get ready for your quest of the day!</h3>
          <Label>
            How much time do you have today?
           <Input 
            type="number"
            value={timeAvailable}
            onChange={(event) => setTimeAvailable(event.target.value)}
            />
          </Label>
          <button type="submit">Get quest</button>
        </Form>
      )}
        {randomQuest && 
          <Div>
            <p>Ok {user.email}, here is your quest of the day: </p>
            <p>{randomQuest.message}</p> 
            <p>Will take about {randomQuest.timeNeeded} min</p>
            <button>complete</button>  
            <Link to='/giveup'>Please don't! You can at least try</Link>   
          </Div>
        }
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  max-height: 280px;
  max-width: 350px;
  margin: 10px;
  border-radius: 12px;
  padding: 10px;
  border: 2px solid var(--accent-color);
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
`

const Input = styled.input`
  background-color: #FFFFFF;
`