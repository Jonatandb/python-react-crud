import React from 'react'

import './Spinner.css'
export const Spinner = () => (
  <div className='position-relative mt-3'>
    <div className='position-absolute end-50'>
      <div className='spinner'></div>
    </div>
  </div>
)
