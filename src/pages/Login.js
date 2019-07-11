import React, { useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { setItem } from '../util/localStorage'
import AppContext from '../AppContext'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be min 6 characters'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Login = () => {
  const { isLoggedIn, signin } = useContext(AppContext)
  const { replace } = useHistory()

  const formik = useFormik({
    initialValues: {
      fullname: '',
      password: '',
      email: ''
    },
    validate,
    onSubmit: async (formData) => {
      const { data } = await axios.post('http://localhost:4000/api/auth', { credentials: formData })
      const { error, errorMessage, token, refreshToken, user } = data

      if (error) {
        return alert(errorMessage)
      }

      if (token && refreshToken) {
        setItem('token', token)
        setItem('refreshToken', refreshToken)
        setItem('user', user)
        signin(user)
        replace('/')
      }
    }
  })

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
