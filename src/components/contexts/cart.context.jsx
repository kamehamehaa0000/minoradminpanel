import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (item, quantity = 1) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[index].quantity += quantity
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...item, quantity }])
    }
  }

  const formatCartDataForBackend = () => {
    return cartItems.map((item) => ({
      foodItemId: item.id,
      quantity: item.quantity,
    }))
  }

  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCartItems)
  }

  const updateItemQuantity = (itemId, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    )
    setCartItems(updatedCartItems)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        formatCartDataForBackend,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
