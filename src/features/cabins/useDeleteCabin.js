import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export default function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      })
      toast.success('cabin successfully Deleted')
    },

    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isDeleting, deleteCabin }
}
