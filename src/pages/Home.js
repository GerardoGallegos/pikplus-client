import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import { mockDesigns } from '../mockData'

const Home = () => {
  const location = useLocation()

  return (
    <div>
      <h1>Home</h1>

      <ul>
        {mockDesigns.map(design => (
          <li key={design.id}>
            <Link to={{
              pathname: `/design/${design.id}`,
              state: {
                design,
                background: location
              }
            }}
            >
              {design.title}
              <Overdrive id={design.id}>
                <img
                  alt='example'
                  style={{
                    position: 'relative',
                    width: 150
                  }}
                  src={design.thumbnail}
                />
              </Overdrive>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
