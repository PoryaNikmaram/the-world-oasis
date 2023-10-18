/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  const { isLoadingUser, isAuthenticated } = useUser()

  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser) navigate('/login')
    },
    [isAuthenticated, isLoadingUser, navigate]
  )

  if (isLoadingUser) return <Spinner />

  if (isAuthenticated) return children
}

export default ProtectedRoute
