import { Routes, Route, Link } from 'react-router-dom'
import { About } from './pages/AboutPage'
import { FriendFeed } from './pages/FriendFeedPage'
import { Home } from './pages/HomePage'
import { Quests } from './pages/QuestPage'
import { Rewards } from './pages/RewardPage'
import { UserProfile } from './pages/UserProfilePage'
import { Login } from './pages/LoginPage'
import { GlobalStyle } from './styles/GlobalStyles'
import { Signup } from './pages/SignupPage'

export const App = () => {

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/feed" element={<FriendFeed />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

// TODO: create page + route for logged in user (=profile?)

// TODO: create page + route for getting quest of the day
