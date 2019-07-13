import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import AppContext from '../AppContext'
import { setItem } from '../util/localStorage'
import { Auth } from '../util/api'

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {}
  if (!values.fullname) {
    errors.fullname = 'Required'
  } else if (values.fullname.length < 5) {
    errors.fullname = 'Must be min 5 characters'
  }

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

const Signup = () => {
  const { isLoggedIn, signin } = useContext(AppContext)
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.
  const formik = useFormik({
    initialValues: {
      fullname: '',
      password: '',
      email: ''
    },
    validate,
    onSubmit: async (formData) => {
      const { error, errorMessage, token, refreshToken, user } = await Auth.signup(formData)

      if (error) {
        return alert(errorMessage)
      }

      if (token && refreshToken) {
        setItem('token', token)
        setItem('refreshToken', refreshToken)
        setItem('user', JSON.stringify(user))
        signin(user)
      }
    }
  })

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.errors.fullname ? <div>{formik.errors.fullname}</div> : null}
      <label htmlFor='fullname'>Full Name</label>
      <input
        id='fullname'
        name='fullname'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.fullname}
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
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Signup
