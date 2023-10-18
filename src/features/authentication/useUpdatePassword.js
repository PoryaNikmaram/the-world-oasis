import { useMutation } from '@tanstack/react-query'
import { updateUserPassword } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdatePassword() {
  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: updateUserPassword,

    onSuccess: () => {
      toast.success('user password successfully updated')
    },
    onError: () => {
      toast.error('user password not updated')
    },
  })

  return { isUpdating, updatePassword }
}
