import { createContext } from 'react'

const registrationModelContext = createContext({
  isOpenReg: false,
  setIsOpenReg: (current) => {},
})

export default registrationModelContext
