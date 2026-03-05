import { LibraryQuestCard } from "./cards/LibraryQuestCard"
import { useState } from 'react'
import { useQuestStore } from "../stores/useQuestStore"
import styled from 'styled-components'
import questLibrary from '../library.json'
import { motion, AnimatePresence } from 'framer-motion'

export const QuestLibrary = () => {
  const { fetchLibraryQuests, libraryQuests, duplicateQuest, createQuest } = useQuestStore()
  const [ isVisible, setIsVisible ] = useState(false)

  const handleAdd = (quest) => {
    createQuest(quest.message, quest.timeNeeded, quest.category)
  }

  return (
    <>
      <h2>Quest library</h2>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
        
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
      </motion.div>
    )}
  </AnimatePresence>
</>
  )
}

