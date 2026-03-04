import styled from 'styled-components'
import { useQuestStore } from '../stores/useQuestStore'
import { useUserStore } from '../stores/useUserStore'
import { useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Defines initial state in one object instead of three separate useState calls
const initialState = {
  timeAvailable: '',
  randomQuest: null,
  noMatch: ''
}

// Reducer function. "When this action happens -> update state" 
const reducer = (state, action) => {
  const { type } = action

  if (type === 'setTime') {
    // when user types in input, update timeAvailable
    return { ...state, timeAvailable: action.time }
  } else if (type === 'setQuest') {
    // when a quest is found, save it
    return { ...state, randomQuest: action.quest }
  } else if (type === 'noMatch') {
    // when something goes wrong, save the error message
    // ...state "keep everything else the same, just change this one thing"
    return { ...state, noMatch: action.message }
  } else {
    return state
  }
}

export const Quests = () => {
const { fetchQuests, completeQuest, quests } = useQuestStore()
const { user } = useUserStore()
const navigate = useNavigate()

// state = current state object, dispatch = function to trigger state changes
const [state, dispatch] = useReducer(reducer, initialState)
// state = the current values of timeAvailable, randomQuest, noMatch
// dispatch = the function you call to trigger a state change

// Get the live version of the quest from the store so checkbox stays in sync
const currentQuest = quests.find(quest => quest._id === state.randomQuest?._id)

const handleComplete = async (id, checked) => {
  await completeQuest(id, checked)
  if (checked) {
    alert('Great work! 🎉')
    navigate('/')
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()

    // dispatch actions: instead of doing setTimeAvailable('30)
    if (!state.timeAvailable) {
      dispatch({ type: 'noMatch', message:'Please enter how many minutes you have available'})
      return
    }

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
          <h2>Let's do this!!</h2>
          <Label>
            How much time do you have today?
           <Input 
            type="number"
            value={state.timeAvailable}
            onChange={(event) => dispatch({ type: 'setTime', time: event.target.value })}
            placeholder='Minutes'
            />
            {state.noMatch && <p>{state.noMatch}</p>}
          </Label>
          <Button type="submit">Get quest</Button>
        </Form>
      )}
        {state.randomQuest && 
          <Div>
            <h2>Ok {user.email}, here is your quest of the day: </h2>
            <p>{state.randomQuest.message}</p> 
            <p>Will take about {state.randomQuest.timeNeeded} min</p>
            <input 
              type='checkbox'
              checked={currentQuest?.done || false}
              onChange={(event) => handleComplete(state.randomQuest._id, event.target.checked)}
            />   
            <Link to='/giveup'>Give up</Link>   
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
  text-align: center;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    max-height: 280px;
    max-width: 350px;
    margin: 10px;
    border-radius: 12px;
    padding: 10px;
    border: 2px solid var(--accent-color);
    text-align: center;
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
  margin-top: 16px;
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
  box-shadow: 2px 4px 4px 0 rgba(139, 139, 139, 0.30);
  margin: 16px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1)
  }
`
// user does something → dispatch is called → reducer runs and returns new state → component re-renders with new state.