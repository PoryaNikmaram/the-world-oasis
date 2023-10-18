import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export default function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //Filter
  const filterValue = searchParams.get('status')

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  //Sort
  const sortValue = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortValue.split('-')
  const sort = { field, direction }

  //Pagination
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filterValue, sortValue, currentPage],
    queryFn: () => getBookings(filter, sort, currentPage),
  })

  //Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterValue, sortValue, currentPage + 1],
      queryFn: () => getBookings(filter, sort, currentPage + 1),
    })
  }

  if (pageCount > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterValue, sortValue, currentPage - 1],
      queryFn: () => getBookings(filter, sort, currentPage - 1),
    })
  }

  return { isLoading, bookings, count }
}
