import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3rem 2.2rem;
  border-right: 1px solid var(--color-grey-200);

  grid-row: 1/-1;
`

function SideBar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  )
}

export default SideBar
