import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Empty from '../../ui/Empty'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import useCheckout from '../check-in-out/useCheckout'
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2'
import { useCheckin } from '../check-in-out/useCheckin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import useDeleteBooking from './useDeleteBooking'
import { useNavigate } from 'react-router-dom'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { isLoading, booking } = useBooking()
  const { isCheckingIn, checkin } = useCheckin()
  const { isCheckingOut, checkout } = useCheckout()
  const { isDeleteBooking, deleteBooking } = useDeleteBooking()

  const moveBack = useMoveBack()
  const navigate = useNavigate()

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resourceName="booking" />

  const status = booking.status
  const bookingId = booking.id

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="deleteBooking">
          <Button variation="danger">Delete</Button>
        </Modal.Open>

        <Modal.Window name="deleteBooking">
          <ConfirmDelete
            resourceName="deleteBooking"
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSettled: navigate('/bookings'),
              })
            }
            disabled={isDeleteBooking}
          />
        </Modal.Window>

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            <HiArrowUpOnSquare />
            check out
          </Button>
        )}
        {status === 'unconfirmed' && (
          <Button
            onClick={() => checkin({ bookingId, breakfast: {} })}
            disabled={isCheckingIn}
          >
            <HiArrowDownOnSquare />
            check in
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  )
}

export default BookingDetail
