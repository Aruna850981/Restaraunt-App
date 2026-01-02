import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import CartContextProvider from './context/CartContext'

ReactDOM.render(
  <CartContextProvider>
    <Router>
      <App />
    </Router>
  </CartContextProvider>,
  document.getElementById('root'),
)
