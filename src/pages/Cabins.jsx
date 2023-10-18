import CabinTable from '../features/cabins/CabinTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import AddNewCabin from '../features/cabins/AddNewCabin'
import CabinTableOpertaions from '../features/cabins/CabinTableOpertaions'

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <CabinTableOpertaions />
      </Row>

      <Row>
        <CabinTable />

        <AddNewCabin />
      </Row>
    </>
  )
}

export default Cabins
