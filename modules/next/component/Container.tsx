import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
  padding: 0 1rem;
  width:100%;
`

export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>
}
