import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
  const queryClient = useQueryClient()
  const { mutate: createCabin, isLoading: isAdding } = useMutation({
    mutationFn: AddCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      })
      toast.success('cabin added successfuly')
      // reset()
    },

    onError: (err) => {
      toast.error(err.message)
      console.error(err)
    },
  })

  return { isAdding, createCabin }
}
