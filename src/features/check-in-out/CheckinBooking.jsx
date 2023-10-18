/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { useEffect, useState } from 'react'
import { useCheckin } from './useCheckin'
import { useSetting } from '../settings/useSetting'
import { formatCurrency } from '../../utils/helpers'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin: 15px 0;
`

function CheckinBooking() {
  const [confirmePaid, setConfirmePaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const { isCheckingIn, checkin } = useCheckin()
  const { setting, isLoading: isLoadingSetting } = useSetting()
  const { booking, isLoading } = useBooking()
  const moveBack = useMoveBack()

  useEffect(
    function () {
      setConfirmePaid(booking?.isPaid ?? false)
    },
    [booking]
  )

  if (isLoading || isLoadingSetting) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking

  const optionalBreakfastPrice = setting.breakfastPrice * numNights * numGuests

  function handleCheckin() {
    if (!confirmePaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast)
              setConfirmePaid(false)
            }}
          >
            want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmePaid}
          disabled={confirmePaid || isCheckingIn}
          onChange={() => setConfirmePaid((confirm) => !confirm)}
        >
          i confirm that {guests.fullName} has paid the total amount of{' '}
          {addBreakfast
            ? `${formatCurrency(optionalBreakfastPrice + totalPrice)}
              (${formatCurrency(optionalBreakfastPrice)} + ${formatCurrency(
                totalPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmePaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
