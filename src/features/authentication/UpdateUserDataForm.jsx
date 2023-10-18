import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUser } from './useUser'
import { useUpdateUser } from './useUpdateUser'

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser()
  const { isUpdating, updateUser } = useUpdateUser()
  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (currentFullName === fullName && !avatar) return

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => handleReset(),
      }
    )
  }

  function handleReset() {
    setAvatar('')
    setFullName(fullName)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
