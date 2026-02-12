import { Routes, Route, Link } from 'react-router-dom'
import { About } from './pages/AboutPage'
import { FriendFeed } from './pages/FriendFeedPage'
import { Home } from './pages/HomePage'
import { Quests } from './pages/QuestPage'
import { Rewards } from './pages/RewardPage'
import { UserProfile } from './pages/UserProfilePage'

export const App = () => {

  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/feed" element={<FriendFeed />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};
