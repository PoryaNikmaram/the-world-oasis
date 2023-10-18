import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser as updateUserApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,

    onSuccess: () => {
      toast.success('user info successfully updated')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: () => {
      toast.error('user info not updated')
    },
  })

  return { isUpdating, updateUser }
}
