import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import styled from 'styled-components'

const Section = styled.section`
  width: 60vw;
  margin: 1em auto;
`

const Design = (props) => {
  const params = useParams()
  const history = useHistory()

  const back = e => {
    e.stopPropagation()
    history.goBack()
  }

  // console.log('params', params,)
  // { props.location.state.design.name }
  return (
    <Section>
      <button onClick={back}>
        Back
      </button>
      <h1>{props.location.state.design.title}</h1>
      <Overdrive id={params.id} duration={400}>
        <img
          alt='morgan'
          style={{
            position: 'relative',
            width: 500
          }}
          src={props.location.state.design.src}
        />
      </Overdrive>
    </Section>
  )
}

export default Design
