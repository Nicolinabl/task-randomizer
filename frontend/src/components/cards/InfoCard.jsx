import styled from 'styled-components'

export const InfoCard = ({ title, description, icon }) => {
  return (
    <Div>
      {icon}
      <div>
        <H2>{title}</H2>
        <p>{description}</p>
      </div>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  background-color: var(--accent-color);
  margin: 10px;
  justify-content: center;
  border-radius: 12px;
  padding: 16px;
  gap: 10px;
  border: 2px solid var(--accent-color);
  background: #FFFFFF;
`;

const H2 = styled.h2`
  font-family: "Pixelify Sans", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`
