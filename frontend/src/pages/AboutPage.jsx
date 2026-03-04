import styled from 'styled-components'

export const About = () => {
  return (
    <PageWrapper>
      <p>What does the app do</p>
      <p>How to get started</p>
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
