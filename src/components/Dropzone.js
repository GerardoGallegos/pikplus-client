import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

export default () => {
  const onDrop = async (files) => {
    if (files[0]) {
      console.log(window.URL.createObjectURL(files[0]))
      const formData = new window.FormData()
      formData.append('image', files[0])
      formData.set('description', 'Insert description here!')

      // Make request
      const res = await axios.post('http://localhost:4000/api/designs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(res)
    }
  }

  return (
    <Dropzone onDrop={onDrop} accept='image/*'>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
