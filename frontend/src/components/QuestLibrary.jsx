import { LibraryQuestCard } from "./cards/LibraryQuestCard"
import { useEffect } from 'react'
import { useQuestStore } from "../stores/useQuestStore"
import styled from 'styled-components'
import questLibrary from '../library.json'

export const QuestLibrary = () => {
  const { fetchLibraryQuests, libraryQuests, duplicateQuest, createQuest } = useQuestStore()

  const handleAdd = (quest) => {
    createQuest(quest.message, quest.timeNeeded, quest.category)
  }

  return (
    <>
      <h2>Library</h2>
      {questLibrary.map((quest, index) => (
        <LibraryQuestCard
          key={index}
          id={index}
          message={quest.message}
          timeNeeded={quest.timeNeeded}
          category={quest.category}
          onAdd={() => handleAdd(quest)}
        />
      ))}


    </>
  )
}



const Container = styled.div`
  display: flex;
  padding: 5px 16px;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid var(--accent-color);
  background-color: #FFFFFF;
  box-shadow: 0 2px 2px 0 #DBDBDB;
  margin: 5px 10px;

`

const P = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`

const TimeP = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--accent-color);
  margin: 0;
`

const Div = styled.div`
  display: flex;
  gap: 5px;
`