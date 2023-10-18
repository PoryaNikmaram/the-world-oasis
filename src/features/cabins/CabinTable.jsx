import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'

import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import { useSearchParams } from 'react-router-dom'

function CabinTable() {
  const { isLoading, cabins } = useCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <Spinner />

  //Filter
  let cabinValue = searchParams.get('discount') || 'all'
  let filteredCabins
  if (cabinValue === 'all') {
    filteredCabins = cabins
  }
  if (cabinValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  }
  if (cabinValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  }

  //Sort
  let sortValue = searchParams.get('sortBy') || 'name-asc'
  const [field, direction] = sortValue.split('-')
  let modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  )

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  )
}

export default CabinTable
