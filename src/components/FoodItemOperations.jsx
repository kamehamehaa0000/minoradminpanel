import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GetAll from './GetAll'
import { useCookies } from 'react-cookie'

const FoodItemOperations = () => {
  const ApiURL = import.meta.env.VITE_APIURL
  console.log(ApiURL)
  const [cookies] = useCookies(['authToken'])

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    prepTime: '',
    description: '',
    availability: '',
    rating: '',
    category: '',
    image: null,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    for (let key in formData) {
      formDataToSend.append(key, formData[key])
    }
    try {
      const response = await axios.post(
        `${ApiURL}/fooditem/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      console.log('Food item added: ', response.data.data)
      resetForm()
    } catch (error) {
      console.error('Error adding food item: ', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      prepTime: '',
      description: '',
      availability: '',
      rating: '',
      category: '',
      image: null,
    })
  }

  return (
    <div className="w-full flex flex-col md:flex-row ">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/5 max-w-lg p-4 md:p-8"
      >
        <h1 className="text-xl font-semibold m-2  ">Add Food Item</h1>
        <div className="mb-1">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-1">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="prepTime"
            className="block text-gray-700 font-bold mb-1"
          >
            Preparation Time:
          </label>
          <input
            type="text"
            id="prepTime"
            name="prepTime"
            placeholder="Preparation Time"
            value={formData.prepTime}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-1"
          >
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md resize-none"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="availability"
            className="block text-gray-700 font-bold mb-1"
          >
            Availability:
          </label>
          <input
            type="text"
            id="availability"
            name="availability"
            placeholder="Availability"
            value={formData.availability}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-1"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="text-center m-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Food Item
          </button>
        </div>
      </form>

      <div className="w-full  md:w-4/5 flex items-center justify-center">
        <GetAll />
      </div>
    </div>
  )
}

export default FoodItemOperations
