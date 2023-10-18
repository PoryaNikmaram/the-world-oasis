/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from 'react'
import useLocalStorageState from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  )

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('light-mode')
        document.documentElement.classList.remove('dark-mode')
      } else {
        document.documentElement.classList.remove('light-mode')
        document.documentElement.classList.add('dark-mode')
      }
    },
    [isDarkMode]
  )

  function handletoggle() {
    setIsDarkMode((theme) => !theme)
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, handletoggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === 'undefined') {
    throw new Error(
      'darkModeContext was used outside od the darkModeContext provider'
    )
  }
  return context
}

export { DarkModeProvider, useDarkMode }
