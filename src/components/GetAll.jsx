import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const GetAll = () => {
  const ApiURL = import.meta.env.VITE_APIURL

  const [foodItems, setFoodItems] = useState([])
  useEffect(() => {
    fetchFoodItems()
  }, [])
  const [cookies] = useCookies(['authToken'])

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${ApiURL}/fooditem/getall`)
      setFoodItems(response.data.data)
    } catch (error) {
      console.error('Error fetching food items: ', error)
    }
  }

  const handleDelete = async (foodItemId) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/fooditem/delete/${foodItemId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      console.log('Food item deleted: ', response.data.data)
      fetchFoodItems()
    } catch (error) {
      console.error('Error deleting food item: ', error)
    }
  }

  const handleEdit = async (foodItemId, updatedFields) => {
    try {
      const response = await axios.put(
        `${ApiURL}/fooditem/update/${foodItemId}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      console.log('Food item updated: ', response.data.data)
      fetchFoodItems()
    } catch (error) {
      console.error('Error updating food item: ', error)
    }
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const updatedFoodItems = [...foodItems]
    updatedFoodItems[index][name] = value
    setFoodItems(updatedFoodItems)
  }

  const handleSave = (foodItemId, index) => {
    const updatedFields = foodItems[index]
    handleEdit(foodItemId, updatedFields)
  }
  return (
    <div className="container  mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">All Food Items</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {foodItems?.map((foodItem, index) => (
          <div
            key={foodItem._id}
            className="bg-white shadow-md rounded-lg p-4 "
          >
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h1>Id: {foodItem._id} </h1>
            Name :
            <input
              type="text"
              name="name"
              value={foodItem.name}
              onChange={(e) => handleChange(e, index)}
              className=" mb-1 text-base border rounded p-1 w-full"
            />
            <br />
            Description :
            <input
              type="text"
              name="description"
              value={foodItem.description}
              onChange={(e) => handleChange(e, index)}
              className=" mb-1 text-base border rounded p-1 w-full"
            />
            Category :
            <input
              type="text"
              name="category"
              value={foodItem.category}
              onChange={(e) => handleChange(e, index)}
              className=" mb-1 text-base border rounded p-1 w-full"
            />
            prepTime :
            <input
              type="text"
              name="prepTime"
              value={foodItem.prepTime}
              onChange={(e) => handleChange(e, index)}
              className=" mb-1 text-base border rounded p-1 w-full"
            />
            Availability :
            <input
              type="text"
              name="availability"
              value={foodItem.availability}
              onChange={(e) => handleChange(e, index)}
              className=" mb-1 text-base border rounded p-1 w-full"
            />
            Price : Rs.
            <input
              type="text"
              name="price"
              value={foodItem.price}
              onChange={(e) => handleChange(e, index)}
              className=" m-2 text-base border rounded p-1 w-[100px]  "
            />
            <div className="flex justify-center mt-4 space-x-4">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                onClick={() => handleSave(foodItem._id, index)}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                onClick={() => handleDelete(foodItem._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetAll
