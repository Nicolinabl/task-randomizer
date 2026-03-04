import styled from 'styled-components'
import { Home } from './HomePage'
import { useUserStore } from '../stores/useUserStore'

export const About = () => {
  const { user } = useUserStore()

  return (
    <PageWrapper>
      {!user && <p>Log in to access the app</p>}
      {user && <Home />}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
