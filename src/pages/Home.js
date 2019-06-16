import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const mockDesigns = [
  {
    id: 1,
    name: 'Women'
  },
  {
    id: 2,
    name: 'Riatata'
  },
  {
    id: 3,
    name: 'Super man'
  },
  {
    id: 4,
    name: 'MashBrosh'
  }
]

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
              {design.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
