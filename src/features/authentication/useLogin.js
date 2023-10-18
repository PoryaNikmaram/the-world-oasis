import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginAPI } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      toast.success('you successfully loged in')
      navigate('/dashboard')
    },

    onError: () => {
      toast.error('invalid email or password')
    },
  })

  return { isLoggingIn, login }
}
