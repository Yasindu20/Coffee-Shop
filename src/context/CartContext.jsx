import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      )
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id && 
            JSON.stringify(item.customizations) === JSON.stringify(existingItem.customizations)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, cartId: Date.now() }]
      }
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload)
      }
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
      
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}