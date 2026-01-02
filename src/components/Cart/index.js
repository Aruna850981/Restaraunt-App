import {useContext} from 'react'
import Header from '../Header'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeCartItem,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const isCartEmpty = cartList.length === 0

  return (
    <div className="cart-page">
      <Header />

      <h2 className="my-orders">My Orders</h2>

      {isCartEmpty ? (
        <div className="empty-cart">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
            className="empty-cart-img"
          />
        </div>
      ) : (
        <div className="cart-container">
          <button
            type="button"
            className="remove-all-btn"
            onClick={removeAllCartItems}
          >
            Remove All
          </button>

          <ul className="cart-list">
            {cartList.map(item => (
              <li key={item.dish_id} className="cart-item">
                <img
                  src={item.dish_image}
                  alt={item.dish_name}
                  className="cart-img"
                />

                <div className="cart-details">
                  <h3>{item.dish_name}</h3>
                  <p>
                    {item.dish_currency}{' '}
                    {(item.dish_price * item.quantity).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decrementCartItemQuantity(item.dish_id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementCartItemQuantity(item.dish_id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeCartItem(item.dish_id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Cart
