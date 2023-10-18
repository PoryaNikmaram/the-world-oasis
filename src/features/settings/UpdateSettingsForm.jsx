/* eslint-disable no-unused-vars */
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSetting } from './useSetting'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
  const { setting } = useSetting()
  const { isLoading: isUpdating, updateSetting } = useUpdateSetting()

  const {
    maxBookingLength,
    minBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = setting || {}

  function handleUpdateSetting(e, field) {
    const { value } = e.target
    updateSetting({ value, field })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdateSetting(e, 'minBookingLength')}
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
