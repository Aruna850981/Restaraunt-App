import './index.css'
import {FaShoppingCart} from 'react-icons/fa'

const Header = props => {
  const {cartCount} = props
  return (
    <div className="header">
      <h1 className="title">UNI Resto Cafe</h1>
      <div className="cart">
        <FaShoppingCart />
        <span className="cart-count">{cartCount}</span>
      </div>
    </div>
  )
}
export default Header
