/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { createPortal } from 'react-dom'

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.position?.x - 20}px;
  top: ${(props) => props?.position?.y}px;

  z-index: 1000;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`

const MenusContext = createContext()

export function Menus({ children }) {
  const [open, setOpen] = useState('')
  const [position, setPosition] = useState(null)
  const close = () => setOpen('')

  return (
    <MenusContext.Provider
      value={{ open, setOpen, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  )
}

export function Toggle({ id }) {
  const { setOpen, open, close, setPosition } = useContext(MenusContext)

  function handleClick(e) {
    e.stopPropagation()

    const rect = e.target.closest('button').getBoundingClientRect()
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    })
    open === '' || open !== id ? setOpen(id) : close()
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

export function List({ children, id }) {
  const { open, position, close } = useContext(MenusContext)
  const ref = useOutsideClick(close, false)

  if (open !== id) return null

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  )
}

export function Button({ children, onClick }) {
  const { close } = useContext(MenusContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{children}</StyledButton>
    </li>
  )
}

Menus.Toggle = Toggle
Menus.Button = Button
Menus.List = List
Menus.Menu = Menu

export default Menus
