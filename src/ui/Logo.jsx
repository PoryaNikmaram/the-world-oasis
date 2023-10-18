import styled from 'styled-components'
import { useDarkMode } from '../contexts/DarkModeToggle'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  margin-bottom: 20px;
`

function Logo() {
  const { isDarkMode } = useDarkMode()
  return (
    <StyledLogo>
      <Img
        src={isDarkMode ? 'public/logo-light.png' : 'public/logo-dark.png'}
        alt="Logo"
      />
    </StyledLogo>
  )
}

export default Logo
