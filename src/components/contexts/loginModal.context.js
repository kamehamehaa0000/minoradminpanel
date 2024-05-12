import { createContext } from 'react'

const loginModalContext = createContext({
  isOpen: false,
  setIsOpen: (current) => {},
})

export default loginModalContext
