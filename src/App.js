import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContextProvider from './context/CartContext'

const App = () => (
  <BrowserRouter>
    <CartContextProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContextProvider>
  </BrowserRouter>
)

export default App
