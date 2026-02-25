import { apiUrl } from "../../api";
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { QuestCard } from "./cards/QuestCard";

export const QuestList = () => {
  const [quests, setQuests] = useState([])
  const [error, setError] = useState(null)


  useEffect(() => {
    const getQuests = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const response = await fetch(apiUrl + '/quests/all', {
          headers: {
            'Authorization': accessToken
          }
        })

        if (!response.ok) {
          throw new Error('failed to fetch quests')
        }

        const data = await response.json()
        setQuests(data.response)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      }
    }

    getQuests()
  }, [])

  // Delete quests
  const handleDelete = async (questId) => {
    try {
      const accessToken = localStorage.getItem('accessToken')

      const response = await fetch(apiUrl + `/quests/${questId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete quest')
      }

      // remove from state
      setQuests(quests.filter(quest => quest._id !== questId))
    } catch (error) {
      console.error('Error deleting quest:', error)
    }
  }

  const handleChecked = async (questId, event) => {
    console.log('questId:', questId)
    console.log('done:', event.target.checked)
    try {
      const accessToken = localStorage.getItem('accessToken')

      const response = await fetch(apiUrl + `/quests/${questId}/complete`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken
        },
        body: JSON.stringify({ done: event.target.checked })
      })
      if (!response.ok) {
        throw new Error('Failed to check quest as done')
      }

    } catch (error) {
      console.error('Error checking quest:', error)
    }
  }

  return (
    <>
      <p>Your quests:</p>
      {quests.map((quest) => (
        <QuestCard
          key={quest._id}
          id={quest._id}
          message={quest.message}
          category={quest.category}
          timeNeeded={quest.timeNeeded}
          done={quest.done}
          onDelete={handleDelete}
          handleChecked={handleChecked}
        />
      ))}
    </>
  )
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  margin: 10px;
  border-radius: 12px;
`

// 1. GET request from api to get all quests quests/all
// 2. map over quests, for each quest create a display of message, time and catagory