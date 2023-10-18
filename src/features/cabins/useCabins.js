import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  })

  return { isLoading, cabins }
}