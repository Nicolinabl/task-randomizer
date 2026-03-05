import { useEffect, useState } from "react";
import styled from "styled-components";

export const MemeOfTheDay = () => {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeme = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://meme-api.com/gimme/wholesomememes",
        );
        const data = await response.json();
        setMeme(data);
      } catch (err) {
        setError("Ooops, couldn't fetch meme");
      } finally {
        setLoading(false);
      }
    };
    fetchMeme();
  }, []);

  /*  if (taskDone) {
        fetchMeme();
      }
    }, */

  if (loading) return <p>Loading your reward....</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {loading && <p>loadingMeme</p>}
      {error && <p>Error: {message}</p>}
      {meme && <MemeImg src={meme.url} alt={meme.title}></MemeImg>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 12px;
`;

const MemeImg = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;
