import './index.css'

const DishCard = props => {
  const {dish, count, onIncrement, onDecrement} = props

  return (
    <div className="dish-card">
      <div className="dish-details">
        <h3>{dish.dish_name}</h3>
        <p className="description">{dish.dish_description}</p>
        <p className="currency">{dish.dish_currency}</p>
        <p className="price">₹ {dish.dish_price}</p>

        {dish.addonCat?.length > 0 && (
          <p className="custom">Customizations available</p>
        )}

        <div className="counter">
          <button onClick={onDecrement} type="button">
            -
          </button>
          <span>{count}</span>
          <button onClick={onIncrement} type="button">
            +
          </button>
        </div>
      </div>

      <img src={dish.dish_image} alt={dish.dish_name} className="dish-image" />
    </div>
  )
}
export default DishCard
