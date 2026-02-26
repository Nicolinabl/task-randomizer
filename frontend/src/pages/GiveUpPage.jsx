import { Link } from "react-router-dom"

export const GiveUp = () => {
  return (
    <>
      <p>please dont, you can at least start! 🥲</p>
      <Link to="/quests"><button>Ok, fine, ugh! take me back</button></Link>
    </>
  )
}