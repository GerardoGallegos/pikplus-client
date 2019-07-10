import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

const App = () => {
  const signin = () => {
    alert('signin')
  }

  return (
    <>
      <GlobalStyles />
      <Router>
        <Navegation />
        <Switch>
          <Route path='/design/:id' component={Design} />
          <Route path='/' exact component={Home} />
          <Route
            path='/login'
            component={(props) => <Login {...props} onSignin={signin} />}
          />
          <Route
            path='/signup'
            component={(props) => <Signup {...props} onSignin={signin} />}
          />
        </Switch>
      </Router>
    </>
  )
}

export default App
