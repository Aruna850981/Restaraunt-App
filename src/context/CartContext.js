import {createContext, useState} from 'react'

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    setCartList(prevCart => {
      const existingItem = prevCart.find(item => item.dish_id === dish.dish_id)

      if (existingItem) {
        return prevCart.map(item =>
          item.dish_id === dish.dish_id
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
      }

      return [...prevCart, {...dish, quantity: 1}]
    })
  }

  const removeCartItem = dishId => {
    setCartList(prevCart => prevCart.filter(item => item.dish_id !== dishId))
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevCart =>
      prevCart.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevCart =>
      prevCart
        .map(item =>
          item.dish_id === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartContextProvider
