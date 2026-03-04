import styled from "styled-components";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { FriendQuestCard } from "../components/cards/FriendQuestCard";
import { apiUrl } from "../../api";
import { useUserStore } from '../stores/useUserStore'

export const FriendFeed = () => {
  const { user } = useUserStore()  
  const [friendsQuests, setFriendsQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /* const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  }); */

  /*   const fetchFriends = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(apiUrl + "/friends", {
        headers: { Authorizarion: `Bearer ${accessToken}` },
      });
    } catch (err) {
      setError(err.message);
    }
  }; */

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(apiUrl + '/feed/quests', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user?.accessToken
          }
        })

        if (!response.ok) throw new Error("Couldn't fetch feed")

        const data = await response.json()
        setFriendsQuests(data)
      } catch (err) {
        setError("Couldn't load quests feed")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchFeed()
  }, [user])

  if (loading) return <div>Loading feed...</div>;
  if (error) return <div>{error}</div>;

  return (
    // pass params from login and register forms to an authentication component to then add authentication after H2
    // smth like {!user ? (<Authentification onAuthSuccess = {handleAuth}>)}
    <PageWrapper>
      <h2>My friends finished quests</h2>

      <form>
        <label>
          Find a friend:
          <input type="search" placeholder="Search username 🔎" />
        </label>
      </form>
      {friendsQuests.map((quest, index) => (
        <FriendQuestCard
          key={quest._id}
          id={quest._id}
          createdBy={quest.createdBy}
          category={quest.category}
          message={quest.message}
          timeNeeded={quest.timeNeeded}
          doneAt={quest.doneAt}
          kudos={quest.kudos}
          isNew={index === 0}
        />
      ))}
    </PageWrapper>
  );
};

//Styles

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;


    // //add error handling
    // setLoading(true);
    // fetch(apiUrl + "/friends", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...accessToken(),
    //   },
    // })
    //   .then((res) => {
    //     if (!res.ok) throw new Error("Couldn't fetch data");
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setFriendsQuests(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError("Coulndn't load friends quests");
    //   })
    //   .finally(() => setLoading(false));