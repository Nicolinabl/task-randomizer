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
          onDelete={handleDelete}
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