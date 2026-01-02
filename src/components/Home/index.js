import {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import Category from '../Category'
import DishCard from '../DishCard'
import {CartContext} from '../../context/CartContext'
import './index.css'

const apiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Home = () => {
  const [menu, setMenu] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  const {cartList, addCartItem} = useContext(CartContext)

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch(apiUrl)
      const data = await res.json()
      setMenu(data[0].table_menu_list)
    }
    getMenu()
  }, [])

  console.log(menu)

  const getDishCount = dishId => {
    const item = cartList.find(each => each.dish_id === dishId)
    return item ? item.quantity : 0
  }

  if (menu.length === 0) return <p className="loading">Loading...</p>

  const dishes = menu[activeTab].category_dishes

  return (
    <div className="app">
      <Header />
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
            count={getDishCount(dish.dish_id)}
            addToCart={() => addCartItem(dish)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
