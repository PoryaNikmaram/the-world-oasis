import { useEffect, useState } from 'react'

export default function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialState
  })

  useEffect(
    function () {
      localStorage.setItem(key, value)
    },
    [key, value]
  )

  return [value, setValue]
}
