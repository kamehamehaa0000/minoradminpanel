import { useState } from 'react'
import registrationModalContext from './components/contexts/registerationModal.context'
import loginModalContext from './components/contexts/loginModal.context'
import cartModalContext from './components/contexts/cartModal.context.js'
import ReservationComponent from './components/ReservationComponent'
import MenuComponent from './components/MenuComponent.jsx'
import OrderComponent from './components/OrderComponent'
import FoodItemOperations from './components/FoodItemOperations'
import StaffComponent from './components/StaffComponent'
import RestaurantComponent from './components/RestaurantComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import MainLayout from './components/MainLayout.jsx'
import { Cookies, useCookies } from 'react-cookie'
import LoginPrompt from './components/Shared/LoginPromt.jsx'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReg, setIsOpenReg] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  return (
    <div className="w-screen h-screen font-[Gilroy] flex-col flex overflow-x-hidden">
      <loginModalContext.Provider value={{ isOpen, setIsOpen }}>
        <cartModalContext.Provider value={{ isOpenCart, setIsOpenCart }}>
          <registrationModalContext.Provider
            value={{ isOpenReg, setIsOpenReg }}
          >
            <BrowserRouter>
              <MainLayout>
                {cookies.authToken ? (
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route
                      path="/restaurant"
                      element={<RestaurantComponent />}
                    />
                    <Route
                      path="/reservations"
                      element={<ReservationComponent />}
                    />
                    <Route path="/staff" element={<StaffComponent />} />
                    <Route path="/fooditems" element={<FoodItemOperations />} />
                    <Route path="/menu" element={<MenuComponent />} />
                    <Route path="/orders" element={<OrderComponent />} />

                    <Route path="/*" element={<Home />} />
                  </Routes>
                ) : (
                  <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/*" element={<LoginPrompt />} />
                  </Routes>
                )}
              </MainLayout>
            </BrowserRouter>
          </registrationModalContext.Provider>
        </cartModalContext.Provider>
      </loginModalContext.Provider>
    </div>
  )
}

export default App
