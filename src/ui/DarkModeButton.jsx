import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useDarkMode } from '../contexts/DarkModeToggle'

function DarkModeButton() {
  const { isDarkMode, handletoggle } = useDarkMode()

  return (
    <ButtonIcon onClick={handletoggle}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  )
}

export default DarkModeButton
