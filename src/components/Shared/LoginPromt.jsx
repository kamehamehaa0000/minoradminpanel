import React, { useContext } from 'react'
import loginModalContext from '../contexts/loginModal.context'
const LoginPrompt = () => {
  const { isOpen, setIsOpen } = useContext(loginModalContext)

  const handleLogin = () => {
    setIsOpen(true)
  }
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p className="text-lg mb-4">You need to log in to access this page.</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  )
}

export default LoginPrompt
