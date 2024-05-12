import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const RestaurantComponent = () => {
  const [newSlotNumber, setNewSlotNumber] = useState('')
  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL

  const handleUpdateTotalSlots = async () => {
    try {
      const response = await axios.post(
        `${ApiURL}/restaurant/totalslots/${newSlotNumber}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      alert(`Total Slots are - ${response.data.data.totalSlots}`)
      // Optionally, you can fetch the updated restaurant data to display
    } catch (error) {
      console.error('Error updating total slots:', error)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4"> Restaurant </h1>
      <h1 className="text-xl font-bold mb-4">Update Total Slots :</h1>
      <div className="flex">
        <input
          type="number"
          className="border border-gray-400 rounded-lg px-4 py-2 mr-2"
          placeholder="New Slot Number"
          value={newSlotNumber}
          onChange={(e) => setNewSlotNumber(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleUpdateTotalSlots}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default RestaurantComponent
