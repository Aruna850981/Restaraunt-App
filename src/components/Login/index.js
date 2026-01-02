import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  const onSubmitSuccess = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = message => {
    setErrorMsg(message)
    setShowError(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="login-title">Login</h1>

        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {showError && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
