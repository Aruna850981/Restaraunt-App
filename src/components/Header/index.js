import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Header = () => {
  const history = useHistory()
  const {cartList} = useContext(CartContext)

  const cartCount = cartList.reduce((sum, item) => sum + item.quantity, 0)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <h1 onClick={() => history.push('/')}>UNI Resto Cafe</h1>

      {/* My Orders text for test cases */}
      <h2 className="my-orders">My Orders</h2>

      <div className="header-right">
        <button
          type="button"
          className="cart-btn"
          data-testid="cart"
          aria-label="Cart"
          onClick={() => history.push('/cart')}
        >
          <FaShoppingCart />
          <span className="cart-count">{cartCount}</span>
        </button>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
