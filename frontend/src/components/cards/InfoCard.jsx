import styled from 'styled-components'

export const InfoCard = ({ title, description, icon }) => {
  return (
    <Div>
      {icon}
      <div>
        <H3>{title}</H3>
        <P>{description}</P>
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

// TODO add #FFFFFF to root colors in globalstyles

const H3 = styled.h3`
  font-family: "Pixelify Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`

const P = styled.p`
  color: #8C737B;
`