import React from 'react'
import { useCookies } from 'react-cookie'
import Login from './Login'
import Register from './Register'
import Sidebar from './Sidebar'

import Navbar from './Navbar'
const MainLayout = ({ children }) => {
  const [cookies] = useCookies(['authToken'])

  return (
    <div>
      <div className="flex w-screen h-screen ">
        <Sidebar />
        <div className="flex-grow z-40 h-full overflow-y-scroll">
          <Login />
          <Register />
          <main className="h-full w-full flex flex-col">
            <Navbar
              isLoggedIn={cookies.authToken ? true : false}
              userDets={cookies.details}
            />
            <div className="mt-10"> {children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
