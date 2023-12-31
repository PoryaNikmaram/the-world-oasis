import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { useLogin } from './useLogin'
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
  const [email, setEmail] = useState('nikmaramp@gmail.com')
  const [password, setPassword] = useState('2011380p')

  const { isLoggingIn, login } = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return null

    login({ email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoggingIn ? <SpinnerMini /> : 'login'}</Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
