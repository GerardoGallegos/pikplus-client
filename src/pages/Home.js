import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import axios from 'axios'
import Dropzone from '../components/Dropzone'

const Home = () => {
  const location = useLocation()
  const [designs, setDesigns] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await axios.get('http://localhost:4000/api/designs')
      const { designs, error, hasMore, total } = res.data
      setDesigns(designs)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <Dropzone />

      <ul>
        {designs.map(design => (
          <li key={design.id}>
            <Link to={{
              pathname: `/design/${design._id}`,
              state: {
                design,
                background: location
              }
            }}
            >
              {design.title}
              <Overdrive id={design._id}>
                <img
                  alt='example'
                  style={{
                    position: 'relative',
                    width: 150
                  }}
                  src={design.source.s200}
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
