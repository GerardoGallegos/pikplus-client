import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { AppProvider } from './AppContext'
import { getItem, removeItem } from './util/localStorage'
import './App.css'

import Navegation from './components/Navegation'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Design from './pages/Design'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Damion|Pacifico&display=swap');

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Pacifico', cursive;
  }
`

const App = () => {
  const [user, setUser] = useState(getItem('user'))
  const [isLoggedIn, setIsLoggedIn] = useState(user && typeof user.fullname === 'string')

  const signin = (user) => {
    setUser(user)
    setIsLoggedIn(true)
  }

  const logout = () => {
    removeItem('token')
    removeItem('refreshToken')
    removeItem('user')
    setUser({})
    setIsLoggedIn(false)
  }

  const value = {
    user,
    isLoggedIn,
    signin,
    logout
  }

  return (
    <AppProvider value={value}>
      <GlobalStyles />
      <Router>
        <Navegation onLogout={logout} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/design/:id' component={Design} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Router>
    </AppProvider>
  )
}

export default App
