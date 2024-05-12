import React, { useContext } from 'react'
import loginModalContext from './contexts/loginModal.context'
import { useCookies } from 'react-cookie'
import cartModalContext from './contexts/cartModal.context'

const Navbar = ({ isLoggedIn, userDets }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  const handleLogout = () => {
    removeCookie('authToken')
    removeCookie('details')
  }
  const { isOpen, setIsOpen } = useContext(loginModalContext)
  const { isOpenCart, setIsOpenCart } = useContext(cartModalContext)

  return (
    <div className="w-full  bg-white h-[60px] p-4 md:p-8 justify-between flex items-center">
      <div className="font-bold text-lg sm:text-2xl">Admin Panel</div>
      {/* <div className="hidden md:flex font-bold items-center text-md gap-2 md:gap-7">
        <a href="/home">
          <div className="hover:border-b-2">Home</div>
        </a>
        <a href="/reservations">
          <div className="hover:border-b-2">Reservations</div>
        </a>
        <a href="/orders">
          <div className="hover:border-b-2">Orders</div>
        </a>
        <a href="/fooditems">
          <div className="hover:border-b-2">Dishes</div>
        </a>
      </div> */}
      <div className="flex font-semibold items-center gap-2 md:gap-4">
        {isLoggedIn ? (
          <>
            <h1 className="capitalize">{`hey, ${cookies?.details?.email[0]}`}</h1>
            <button
              className="text-lg bg-red-400 py-1 px-3 rounded-full md:text-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="text-lg bg-blue-500 px-3 py-1 rounded-full md:text-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
