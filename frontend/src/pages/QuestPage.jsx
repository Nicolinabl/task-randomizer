import styled from 'styled-components'
import { useQuestStore } from '../stores/useQuestStore'
import { useUserStore } from '../stores/useUserStore'
import { useReducer } from 'react'
import { Link } from 'react-router-dom'

// Defines initial state, replaces multiple useState calls
const initialState = {
  timeAvailable: '',
  randomQuest: null,
  noMatch: ''
}

// Reducer function. Decides how state should change based on the action. Takes the current state and an action, and returns the new state
const reducer = (state, action) => {
  const { type } = action

  if (type === 'setTime') {
    return { ...state, timeAvailable: action.time }
  } else if (type === 'setQuest') {
    return { ...state, randomQuest: action.quest }
  } else if (type === 'noMatch') {
    return { ...state, noMatch: action.message }
  } else {
    return state
  }
}

export const Quests = () => {
const { fetchQuests } = useQuestStore()
const { user } = useUserStore()

// state = current state object, dispatch = function to trigger state changes
const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const freshQuests = await fetchQuests()

    if (freshQuests.length === 0) {
      dispatch({ type: 'noMatch', message: 'You have no quests yet!' })
      return
    }

    // Filter quests. Show only quests under chosen time frame
    const filtered = freshQuests.filter(quest => quest.timeNeeded <= Number(state.timeAvailable))

    if (filtered.length === 0) {
      dispatch({ type: 'noMatch', message: `No quests under ${state.timeAvailable} minutes` })
      return
    }

    // Problem initially: gave random quest below requested time available, but could giv quest a LOT shorter then inputted time. Solved by: first sort timeNeeded closest to available time first.
    const sorted = filtered.sort((a, b) => b.timeNeeded - a.timeNeeded)

    // THEN: Take the top 3 closest matches and pick randomly from them
    const topMatches = sorted.slice(0, 3)
    const random = topMatches[Math.floor(Math.random() * topMatches.length)]
    dispatch({ type: 'setQuest', quest: random })
  }


  return (
    <>
      {!state.randomQuest && (
        <Form onSubmit={handleSubmit}>
          <h3>Get ready for your quest of the day!</h3>
          <Label>
            How much time do you have today?
           <Input 
            type="number"
            value={state.timeAvailable}
            onChange={(event) => dispatch({ type: 'setTime', time: event.target.value })}
            />
            {state.noMatch && <p>{state.noMatch}</p>}
          </Label>
          <button type="submit">Get quest</button>
        </Form>
      )}
        {state.randomQuest && 
          <Div>
            <p>Ok {user.email}, here is your quest of the day: </p>
            <p>{state.randomQuest.message}</p> 
            <p>Will take about {state.randomQuest.timeNeeded} min</p>
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