import { LibraryQuestCard } from "./cards/LibraryQuestCard"
import { useEffect } from 'react'
import { useQuestStore } from "../stores/useQuestStore"
import styled from 'styled-components'

export const QuestLibrary = () => {
  const { fetchLibraryQuests, libraryQuests } = useQuestStore()

  useEffect(() => {
    fetchLibraryQuests()
  }, [])

  return (
    <>
      <h2>Library</h2>
      <Container>
        <Div>
          <div>
            <P>Clean kitchen sink</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>10 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Unload washing machine</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>15 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Clean the toilet</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>18 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Put things at their places from the work table",
            "timeNeeded</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>12 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Put clothes in the closet or in laundry</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>8 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Dust one room</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>15 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>

      <Container>
        <Div>
          <div>
            <P>Water the plants</P>
            {/* <p>Category: {category}</p> */}
            <TimeP>5 min</TimeP>
          </div>
        </Div>
        <button>+</button>
      </Container>





      {/* {libraryQuests.map((libraryQuests) => (
        <LibraryQuestCard 
          key={libraryQuests._id}
          message={libraryQuests.message}
          timeNeeded={libraryQuests.timeNeeded}
        />
      ))} */}
    </>
  )
}

// 1. get library quests from backend
// 2. Styling
// 3. frontend-backend connection (add library quest to library list)


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