import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useDeleteBooking() {
  const queryClient = useQueryClient()
  const { isLoading: isDeleteBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),

    onSuccess: () => {
      toast.success(`booking has successfullly deleted`)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },

    onError: () => {
      toast.error(`there was an error while delete booking`)
    },
  })

  return { isDeleteBooking, deleteBooking }
}

export default useDeleteBooking
