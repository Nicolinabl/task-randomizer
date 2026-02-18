import { Routes, Route, Link } from "react-router-dom";
import { About } from "./pages/AboutPage";
import { FriendFeed } from "./pages/FriendFeedPage";
import { Home } from "./pages/HomePage";
import { Quests } from "./pages/QuestPage";
import { Rewards } from "./pages/RewardPage";
import { UserProfile } from "./pages/UserProfilePage";
import { Login } from "./pages/LoginPage";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Signup } from "./pages/SignupPage";
import { useEffect, useState } from "react";
import { apiUrl } from "../api";

export const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("API Response:", data);
        setData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

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
