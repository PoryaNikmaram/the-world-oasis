import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting as updateSettingAPI } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { isLoading, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['setting'],
      })
      toast.success('setting successfully updated')
    },
    onError: (err) => {
      console.error(err.message)
      toast.error(err)
    },
  })

  return { updateSetting, isLoading }
}
