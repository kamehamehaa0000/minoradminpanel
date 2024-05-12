import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const ReservationComponent = () => {
  const [reservations, setReservations] = useState([])
  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${ApiURL}/reservation/getall`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        setReservations(response.data.data)
      } catch (error) {
        console.error('Error fetching reservations:', error)
      }
    }

    fetchReservations()
  }, [cookies.authToken])

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `${ApiURL}/reservation/admin/delete/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      const response = await axios.get(`${ApiURL}/reservation/getall`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      setReservations(response.data.data)
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Reservations</h1>
      <div>
        <h2 className="text-xl font-bold mb-2">All Reservations:</h2>
        <div className="w-full sm:w-1/2">
          {reservations?.map((reservation) => (
            <li key={reservation._id} className="grid grid-cols-2 mb-2">
              <h1 className="flex items-center font-medium">
                Date: {reservation.date}, Time: {reservation.time}, Heads:{' '}
                {reservation.heads}
              </h1>
              <button
                className="px-2 py-1 w-[100px] bg-red-500 text-white rounded-md ml-2"
                onClick={() => handleDeleteReservation(reservation._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReservationComponent
