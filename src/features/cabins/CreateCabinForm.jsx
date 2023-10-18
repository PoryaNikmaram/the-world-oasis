/* eslint-disable react/prop-types */
import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'

import { useCreateCabin } from './useCreateCabin'
import { useEditeCabin } from './useEditCabin'

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editedId, ...editValues } = cabinToEdit
  const isEditing = Boolean(editedId)

  const { handleSubmit, register, formState, getValues, reset } = useForm({
    defaultValues: isEditing ? editValues : {},
  })
  const { errors } = formState

  const { isAdding, createCabin } = useCreateCabin()
  const { isUpdating, editCabin } = useEditeCabin()

  const isWorking = isAdding || isUpdating

  function onSubmit(data) {
    if (isEditing)
      editCabin(
        { data, editedId },
        {
          onSuccess: () => {
            reset()
            onClose?.()
          },
        }
      )
    else
      createCabin(
        { ...data },
        {
          onSuccess: () => {
            reset()
            onClose?.()
          },
        }
      )
  }

  function onError(err) {
    console.log(err)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register('name', {
            required: 'name field is required',
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'max capacity field is required',
            min: {
              value: 1,
              message: 'capacity should be at least 1',
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'regular price field is required',
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'discount field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'discount should be less than regular price',
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditing ? false : 'image field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isAdding}>
          {isEditing ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
