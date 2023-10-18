import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'

function Logout() {
  const { isLoggingout, logout } = useLogout()
  return (
    <ButtonIcon onClick={logout} disabled={isLoggingout}>
      {!isLoggingout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  )
}

export default Logout
