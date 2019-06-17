import React from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
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

const ModalSwitch = () => {
  const location = useLocation()
  return (
    <div>
      <Navegation />
      <Switch location={location}>
        <Route path='/design/:id' component={Design} />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  )
}

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <ModalSwitch />
      </Router>
    </>
  )
}

export default App
