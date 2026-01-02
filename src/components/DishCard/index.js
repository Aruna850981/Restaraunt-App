import {useState, useContext} from 'react'
import {CartContext} from '../../context/CartContext'
import './index.css'

const DishCard = props => {
  const {dish} = props
  const {addCartItem} = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const isAvailable = dish.dish_Availability === true

  const onIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const onAddToCart = () => {
    addCartItem({...dish, quantity})
    setQuantity(0)
  }

  return (
    <li className="dish-card">
      {/* Dish Details */}
      <div className="dish-details">
        <h3>{dish.dish_name}</h3>

        <p className="price">
          {dish.dish_currency} {dish.dish_price}
        </p>

        {dish.dish_description && (
          <p className="description">{dish.dish_description}</p>
        )}

        {!isAvailable && <p className="custom">Not available</p>}

        {/* Quantity Counter (ALWAYS visible) */}
        <div className="counter">
          <button type="button" onClick={onDecrement} disabled={quantity === 0}>
            -
          </button>

          <p>{quantity}</p>

          <button type="button" onClick={onIncrement} disabled={!isAvailable}>
            +
          </button>
        </div>

        {/* Add to Cart */}
        {quantity > 0 && isAvailable && (
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={onAddToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>

      {/* Dish Image */}
      <img src={dish.dish_image} alt={dish.dish_name} className="dish-image" />
    </li>
  )
}

export default DishCard
