import React from 'react'
import { NavLink as UnstyleNavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background: #100f13;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const NavLink = styled(UnstyleNavLink)`
  color: #999;
  text-decoration: none;
`

const activeStyles = {
  color: '#FFF'
}

const Navigation = () => {
  return (
    <Nav>
      <NavLink to='/' activeStyle={activeStyles} exact>
        PikPlus
      </NavLink>
      <NavLink to='/login' activeStyle={activeStyles}>
        Login
      </NavLink>
      <NavLink to='/signup' activeStyle={activeStyles}>
        Signup
      </NavLink>
    </Nav>
  )
}

export default Navigation
