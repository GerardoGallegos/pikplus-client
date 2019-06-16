import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Design = (props) => {
  const params = useParams()
  // console.log('params', params,)
  // { props.location.state.design.name }
  return (
    <div>
      <h1>Design</h1>
    </div>
  )
}

export default Design
