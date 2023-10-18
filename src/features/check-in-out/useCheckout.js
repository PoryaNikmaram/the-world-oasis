import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useCheckout() {
  const queryClient = useQueryClient()
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} has successfully checked out`)
      queryClient.invalidateQueries({ active: true })
    },

    onError: () => toast.error('there was an error while checking out'),
  })

  return { isCheckingOut, checkout }
}

export default useCheckout
