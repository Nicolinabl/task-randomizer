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
const [noMatch, setNoMatch] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNoMatch('')
    await fetchQuests()

    if (quests.length === 0) {
      setNoMatch('You are a lucky one! No quests on your list')
      return
    }

    const filtered = quests.filter(quest => quest.timeNeeded <= Number(timeAvailable))

    if (filtered.length === 0) {
      setNoMatch(`No quests on your list under ${timeAvailable} minutes. Try something else.`)
    } 

    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomQuest(random)
  }

  return (
    <>
      {!randomQuest && (
        <Form onSubmit={handleSubmit}>
          <H2>Let's do this!</H2>
          <Label>
            How much time do you have today?
           <Input 
            type="number"
            placeholder="Minutes"
            value={timeAvailable}
            onChange={(event) => setTimeAvailable(event.target.value)}
            />
          {noMatch && <p>{noMatch}</p>}
          </Label>
          <Button type="submit">Get random quest</Button>
        </Form>
      )}
        {randomQuest && 
          <Div>
            <H2>Ok {user.email}, here is your quest of the day: </H2>
            <p>{randomQuest.message}</p> 
            <p>Will take about {randomQuest.timeNeeded} min</p>
            <input type='checkbox' />complete 
            <Link to='/giveup'>Skip todays quest..</Link>   
          </Div>
        }
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  max-width: 350px;
  margin: 10px;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid var(--accent-color);
  text-align: center;
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
  border: 2px solid var(--accent-color);
  padding: 16px;
  align-items: center;
`

const Input = styled.input`
  background-color: #FFFFFF;
  display: flex;
  height: 52px;
  padding: 15px 16px 14px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 12px;
  border: none;
  margin: 16px 0;
`

const Button = styled.button`
  display: flex;
  height: 54px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 2px solid #E9628C;
  background: #F497B4;
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30)
`

// FIXME move button styling to component

const H2 = styled.h2`
  margin: 0 0 16px 0;
`