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
import { Navbar } from "./components/Navbar";

export const App = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = () => (user ? { Authorization: user.accessToken } : {});

  // TODO remove?
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

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    const userEmail = localStorage.getItem('userEmail')
    const userName = localStorage.getItem('userName')

    if (accessToken && userId) {
      setUser({ 
        accessToken, 
        userId, 
        email: userEmail, 
        name: userName 
      })
    }
  }, []) 

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
  }

  return (
    <>
      <GlobalStyle />
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/feed"
          element={<FriendFeed accessToken={accessToken} />}
        />
        <Route path="/quests" element={<Quests />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<UserProfile user={user}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
