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
  // TODO This could be a reactive state (`useState`) that loads this value as default, but has a `set` function that other components, like Login could use to update it only when it should really be modified
  const accessToken = localStorage.getItem("accessToken");


  const handleLogout = () => {
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
        {/** TODO This is commented because I deleted the `user` variable. I think all the user-data related code should be reorganized, maybe the UserProfile component could load it's own data  */}
        {/* <Route path="/profile" element={<UserProfile user={user} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
