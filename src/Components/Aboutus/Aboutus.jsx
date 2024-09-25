import React from 'react'
import './Aboutus.css'
const Aboutus = ({subtitle,title}) => {
  return (
    <div className='title'>
      <p>{subtitle}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default Aboutus
