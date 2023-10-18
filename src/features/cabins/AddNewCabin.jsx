import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

function AddNewCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddNewCabin