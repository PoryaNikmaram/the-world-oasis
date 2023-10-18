/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from 'styled-components'

import { formatCurrency } from '../../utils/helpers'

import CreateCabinForm from './CreateCabinForm'
import useDeleteCabin from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function CabinRow({ cabin }) {
  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin

  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isAdding, createCabin } = useCreateCabin()

  function handleDuplicateCabin() {
    createCabin({
      name: `copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    })
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>dits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : '-'}</Discount>

        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={cabinID} />
              <Menus.List id={cabinID}>
                <Menus.Button
                  onClick={handleDuplicateCabin}
                  disabled={isAdding}
                >
                  <HiSquare2Stack />
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="delete">
                  <Menus.Button>
                    <HiTrash />
                    Delete
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="edit">
                  <Menus.Button>
                    <HiPencil />
                    Edit
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  onConfirm={() => deleteCabin(cabinID)}
                  disabled={isDeleting}
                />
              </Modal.Window>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
            </Menus.Menu>
          </Menus>
        </Modal>
      </Table.Row>
    </Table>
  )
}

export default CabinRow
