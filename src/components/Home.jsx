import { useCookies } from 'react-cookie'
const Home = () => {
  const [cookie, setCookie] = useCookies(['authToken'])
  return (
    <div className="w-screen h-screen p-8 sm:p-32 ">
      <div className="text-blue-400 text-4xl md:text-6xl font-bold">
        Welcome!
        <h1 className="text-gray-500 text-2xl inline "> , This is home page</h1>
      </div>
      <div className="text-gray-500 text-xl mx-2 my-4">
        <h1>You can navigate to different sections using the side bar</h1>
        <h1> OR</h1>
        <h1>Go to the following routes : [ Make sure you are logged in. ]</h1>
        <h1 className="text-green-600 mt-2">
          {'<Route path="/home" element={<Home />} />'}
        </h1>
        <h1 className="text-green-600">
          {'<Route path="/restaurant" element={<RestaurantComponent />} /> '}
        </h1>
        <h1 className="text-green-600">
          {'<Route path="/reservations" element={<ReservationComponent />} />'}
        </h1>
        <h1 className="text-green-600">
          {'<Route path="/staff" element={<StaffComponent />} />'}
        </h1>
        <h1 className="text-green-600">
          {'<Route path="/orders" element={<OrderComponent />} />'}
        </h1>
        <h1 className="text-green-600">
          {'</h1><Route path="/fooditems" element={<FoodItemOperations />} />'}
        </h1>
        <h1 className="text-green-600">
          {'<Route path="/menu" element={<MenuComponent />} />'}
        </h1>
      </div>
    </div>
  )
}

export default Home
