import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useEditeCabin() {
  const queryClient = useQueryClient()
  const { mutate: editCabin, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      })
      toast.success('cabin updated successfuly')
      // reset()
    },

    onError: (err) => {
      toast.error(err.message)
      console.error(err)
    },
  })
  return { isUpdating, editCabin }
}
