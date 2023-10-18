import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'

import { useUpdatePassword } from './useUpdatePassword'

function UpdatePasswordForm() {
  const { isUpdating, updatePassword } = useUpdatePassword()

  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState

  function onSubmit(data) {
    updatePassword(data, {
      onSettled: () => {
        reset()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            minLength: {
              value: 8,
              message: 'password must be at least 8 characters',
            },
            required: 'this field is required ',
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            validate: (value) => {
              return value === getValues().password || 'passwords not match'
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
