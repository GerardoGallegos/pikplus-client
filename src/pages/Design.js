import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import styled from 'styled-components'

const Section = styled.section`
  width: 60vw;
  margin: 1em auto;
`

const Colors = styled.div`
  min-width: 100px;
  height: 30px;
  background: #FFF;
  border: 1px solid gray;
`

const Color = styled.span`
  width: 30px;
  height: 30px;
  background: #FFF;
  display: inline-block;
  border-left: 1px solid #FFF;
`

const Design = (props) => {
  const params = useParams()
  const history = useHistory()

  const back = e => {
    e.stopPropagation()
    history.goBack()
  }

  return (
    <Section>
      <button onClick={back}>
        Back
      </button>
      <h1>{props.location.state.design.description}</h1>
      <Colors>
        {props.location.state.design.colorsRGB.map((color, i) => (
          <Color
            key={i}
            style={{
              background: `rgba(${color[0]},${color[1]},${color[2]})`
            }}
          />
        ))}
      </Colors>
      <Overdrive id={params.id} duration={400}>
        <img
          alt='morgan'
          style={{
            position: 'relative',
            width: 500
          }}
          src={props.location.state.design.source.s300}
        />
      </Overdrive>
    </Section>
  )
}

export default Design
