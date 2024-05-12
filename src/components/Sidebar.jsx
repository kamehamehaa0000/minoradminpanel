import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoTriangleRight } from 'react-icons/go'
import { GoTriangleLeft } from 'react-icons/go'
import { useCookies } from 'react-cookie'
import { FaRegUserCircle } from 'react-icons/fa'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [cookies] = useCookies('authToken')
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex bg-white item-center justify-center z-[99]  py-4  h-screen">
      <div
        className={` text-white w-64 h-full flex-shrink-0 ${
          isSidebarOpen ? '' : 'hidden'
        }`}
      >
        <div className=" flex  p-2 rounded-full flex-col items-center justify-center text-black text-xl  pt-5 font-semibold">
          <FaRegUserCircle className="text-5xl m-2" />
          <h1 className="p-2 capitalize ">{cookies?.details?.email}</h1>
        </div>

        <div className="w-full flex-col pt-6 flex gap-5 ">
          <h1 className=" capitalize text-black text-center text-xl font-bold">
            Admin Panel
          </h1>
          <Link to="/Home">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Home
            </button>
          </Link>
          <Link to="/fooditems">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Dishes
            </button>
          </Link>
          <Link to="/restaurant">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Restaurant
            </button>
          </Link>
          <Link to="/orders">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Orders
            </button>
          </Link>
          <Link to="/staff">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Staff
            </button>
          </Link>
          <Link to="/Reservations">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Reservations
            </button>
          </Link>
          <Link to="/Menu">
            <button className="px-4 hover:bg-zinc-300 hover:text-black font-semibold py-2 mx-4 w-10/12 rounded-2xl bg-zinc-800">
              Menu
            </button>
          </Link>
        </div>
      </div>
      <div className="w-2  h-screen flex items-center justify-center">
        <button
          className="w-2 h-[100px] bg-zinc-400 rounded-full hover:scale-110 text-4xl font-extrabold"
          onClick={toggleSidebar}
        >
          {/* {isSidebarOpen ? <GoTriangleLeft /> : <GoTriangleRight />} */}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
