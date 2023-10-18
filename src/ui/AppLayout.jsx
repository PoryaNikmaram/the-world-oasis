import { Outlet } from 'react-router-dom'
import Header from './Header'
import SideBar from './SideBar'
import styled from 'styled-components'

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 4rem 4.8rem 6.4rem;
`

const StyledMaxWidth = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <Main>
        <StyledMaxWidth>
          <Outlet />
        </StyledMaxWidth>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
