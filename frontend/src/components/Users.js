import React, { useState } from 'react'

const Users = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSumbit = e => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (
    <div className='row'>
      <div className='col-md-4'>
        <form onSubmit={handleSumbit} className='card card-body'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              className='form-control mb-2'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              className='form-control mb-2'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-primary btn-block'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default Users
