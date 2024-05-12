import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
const MenuComponent = () => {
  const [menu, setMenu] = useState(null)
  const [foodItemId, setFoodItemId] = useState('')
  const ApiURL = import.meta.env.VITE_APIURL

  const [cookies] = useCookies(['authToken'])

  // Fetch menu data from the API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${ApiURL}/menu/getmenu`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        setMenu(response.data.data)
      } catch (error) {
        console.error('Error fetching menu:', error)
      }
    }
    fetchMenu()
  }, [])

  const handleAddFoodItem = async () => {
    try {
      await axios.post(
        `${ApiURL}/menu/additem`,
        { foodItemId },
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      // Refresh the menu after adding the food item
      const response = await axios.get(`${ApiURL}/menu/getmenu`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setMenu(response.data.data)
      setFoodItemId('')
    } catch (error) {
      console.error('Error adding food item:', error)
    }
  }

  const handleDeleteFoodItem = async (foodItemId) => {
    try {
      await axios.delete(`${ApiURL}/menu/deleteitem`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
        data: { foodItemId },
      })
      // Refresh the menu after deleting the food item
      const response = await axios.get(`${ApiURL}/menu/getmenu`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setMenu(response.data.data)
    } catch (error) {
      console.error('Error deleting food item:', error)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Food Items:</h2>
        <div className="w-full sm:w-1/2">
          {menu &&
            menu.items.map((item) => (
              <li
                key={item._id + Math.random()}
                className="grid grid-cols-2 mb-2 items-center gap-4 "
              >
                <h1 className=" font-medium">{item.name} </h1>
                <button
                  className="px-2 w-[100px]  py-1 bg-red-500 text-white rounded-md "
                  onClick={() => handleDeleteFoodItem(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add Food Item:</h2>
        <div className="">
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 mr-2"
            placeholder="Food Item ID"
            value={foodItemId}
            onChange={(e) => setFoodItemId(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddFoodItem}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuComponent
