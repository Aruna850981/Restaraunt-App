import './index.css'
import {useState, useEffect} from 'react'
import Header from '../Header'
import Category from '../Category'
import DishCard from '../DishCard'

const apiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Restaurant = () => {
  const [menu, setMenu] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [cart, setCart] = useState({})

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setMenu(data[0].table_menu_list)
      })
  }, [])

  const handleIncrement = (id, dish) => {
    setCart(prev => ({
      ...prev,
      [id]: {
        count: (prev[id]?.count || 0) + 1,
        dish,
      },
    }))
  }

  const handleDecrement = id => {
    setCart(prev => {
      if (!prev[id]) return prev

      const newCount = prev[id].count - 1
      if (newCount <= 0) {
        const updated = {...prev}
        delete updated[id]
        return updated
      }

      return {
        ...prev,
        [id]: {...prev[id], count: newCount},
      }
    })
  }

  const totalCartCount = Object.values(cart).reduce(
    (sum, item) => sum + item.count,
    0,
  )

  if (menu.length === 0) return <p className="loading">Loading...</p>

  const dishes = menu[activeTab].category_dishes

  return (
    <div className="app">
      <Header cartCount={totalCartCount} />
      <Category
        categories={menu}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />
      <div className="dishes-section">
        {dishes.map(dish => (
          <DishCard
            key={dish.dish_id}
            dish={dish}
            count={cart[dish.dish_id]?.count || 0}
            onIncrement={() => handleIncrement(dish.dish_id, dish)}
            onDecrement={() => handleDecrement(dish.dish_id)}
          />
        ))}
      </div>
    </div>
  )
}
export default Restaurant
