import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import TextInput from './Shared/TextInput'
const OrderComponent = () => {
  const [orders, setOrders] = useState([])
  const [orderbyid, setOrderbyid] = useState(null)

  const [cookies] = useCookies(['authToken'])
  const ApiURL = import.meta.env.VITE_APIURL
  const [orderID, setOrderID] = useState('')
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${ApiURL}/order/getall`, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        })
        setOrders(response.data.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${ApiURL}/order/admin/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      // Remove the deleted order from the list
      setOrders(orders.filter((order) => order._id !== orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const handleGetOrderById = async (orderId) => {
    try {
      const response = await axios.get(
        `${ApiURL}/order/getbyorderid/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      )
      setOrderbyid(response.data.data)
      console.log('Order Details:', response.data.data)
    } catch (error) {
      console.error('Error fetching order by ID:', error)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">All Orders</h1>
      <div>
        {orders?.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-4 border border-gray-300 p-4">
              <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
              <ul>
                {order.cart.map((item) => (
                  <li key={item._id} className="mb-2">
                    {item?.item?.name} - Qty: {item.qty} - Total Price: $
                    {item.totalPrice}
                  </li>
                ))}
              </ul>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mt-2 mr-2"
                onClick={() => handleDeleteOrder(order._id)}
              >
                Delete Order
              </button>
            </div>
          ))
        )}
        <div className="w-full">
          <div className="w-full md:w-1/3">
            <TextInput
              label={'OrderID'}
              placeholder={'Enter OrderID'}
              type="text"
              value={orderID}
              onChange={setOrderID}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
            onClick={() => handleGetOrderById(orderID)}
          >
            GET ORDER BY ID
          </button>
          {orderbyid && (
            <div
              key={orderbyid._id}
              className="mb-4 border border-gray-300 p-4"
            >
              <h2 className="text-xl font-bold mb-2">
                Order ID: {orderbyid._id}
              </h2>
              <ul>
                {orderbyid.cart.map((item) => (
                  <li key={item._id} className="mb-2">
                    {item?.item?.name} - Qty: {item.qty} - Total Price: $
                    {item.totalPrice}
                  </li>
                ))}
              </ul>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mt-2 mr-2"
                onClick={() => handleDeleteOrder(orderbyid._id)}
              >
                Delete Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderComponent
