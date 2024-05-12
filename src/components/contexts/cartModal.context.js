import { createContext } from 'react'

const cartModalContext = createContext({
  isOpenCart: false,
  setIsOpenCart: (current) => {},
})

export default cartModalContext
