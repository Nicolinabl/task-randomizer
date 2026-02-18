import styled from 'styled-components'

export const Header = () => {
  return (
    <>
      <Div>
        <h1>Welcome</h1>
      </Div>
      <Div>
        <P>text here</P>
      </Div>
      <Div>
        <P>text here</P>
      </Div>
      <Div>
        <P>text here</P>
      </Div>
    </>
  )
}

const Div = styled.div`
  display: flex;
  background-color: var(--secondary-color);
  margin: 5px 10px;
`

const P = styled.p`
  margin: 0;
`
