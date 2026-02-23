import { QuestCard } from '../components/cards/QuestCard'
import { Navbar } from '../components/Navbar'

export const FriendFeed = () => {
  const [friendsQuests, setFriendsQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const authentificationToken = () =>
    user ? { Authorizarion: user.accesToken } : {};

  const handleAuth = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  useEffect(() => {
    //add error handling
    setLoading(true);
    fetch(apiUrl + "/friends")
      .then((response) => response.json())
      .then((data) => {
        const showData = data.map((item) => ({
          id: item._id,
          message: item.message,
          doneAt: item.doneAt,
          author: item.name,
        }));
        setFriendsQuests(showData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <h2>My friends finished quests</h2>
      <form>
        <label>
          Find a friend:
          <input type="search" placeholder="Search username 🔎" />
        </label>
      </form>
      <FriendQuestCard />
    </>
  );
};
