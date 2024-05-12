import React from 'react'
import { useCart } from '../contexts/cart.context'
import { IoAdd } from 'react-icons/io5'

const DishCard = ({ name, description, price, image, id }) => {
  const { addItemToCart } = useCart()
  const handleAddToCart = () => {
    addItemToCart({ id, name, price })
  }
  return (
    <div className=" relative w-2/5  md:max-w-[300px] min-h-[350px] md:min-h-[370px] sm:w-2/12 group border-2 m-4 max-h-[400px] rounded-lg hover:scale-105 overflow-hidden bg-white">
      <div className="h-6/12 overflow-hidden">
        <img
          src={image}
          className="object-cover object-center w-full h-[200px] group-hover:scale-105 rounded-t-lg"
          alt=""
        />
      </div>
      <div className="p-2 h-2/5 overflow-hidden">
        <h1 className="text-base md:text-[1vw] sm:text-xl font-bold">{name}</h1>
        <p className="text-xs sm:text-sm font-medium">{description}</p>
      </div>
      <div className=" absolute bottom-0 left-0 w-full flex h-2/12 bg-white justify-between items-center p-2">
        <span className="font-bold text-sm sm:text-base">₹{price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-green-400 px-3 py-1 md:p-2 rounded-full text-white font-bold text-2xl sm:text-sm"
        >
          <IoAdd />
        </button>
      </div>
    </div>
  )
}

export default DishCard
