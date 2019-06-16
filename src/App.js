import React from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom'
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

const Modal = () => {
  const history = useHistory()
  const location = useLocation()
  const { design } = location.state

  if (!design) return null

  const back = e => {
    e.stopPropagation()
    history.goBack()
  }

  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.9)'
      }}
    >
      <div
        className='modal'
        style={{
          position: 'absolute',
          background: '#fff',
          top: 25,
          left: '10%',
          right: '10%',
          padding: 15,
          border: '2px solid #444'
        }}
      >
        <h1>
          {location.state.design.name}
        </h1>
        <button type='button' onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
}

const ModalSwitch = () => {
  const location = useLocation()

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  const background = location.state && location.state.background

  return (
    <div>
      <Navegation />
      <Switch location={background || location}>
        <Route path='/design/:id' component={Design} />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
      {/* Show the modal when a background page is set */}
      {background && <Route path='/design/:id' children={<Modal />} />}
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
