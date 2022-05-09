import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from './Spinner/Spinner'

const API_URL = process.env.REACT_APP_API_URL

const Users = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [users, setUsers] = useState([])
  const componentIsMounted = useRef(true)

  useEffect(() => {
    if (componentIsMounted.current) {
      getUsers()
    }

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  const handleSumbit = async e => {
    e.preventDefault()
    if (isEditMode) {
      await updateUser(currentUserId)
    } else {
      await createUser(currentUserId)
    }

    setName('')
    setEmail('')
    setPassword('')
    setIsEditMode(false)
    setCurrentUserId(null)
    getUsers()
  }

  const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`)
    const data = await res.json()
    setUsers(data)
    setIsLoading(false)
  }

  const deleteUser = async id => {
    // eslint-disable-next-line no-restricted-globals
    const res = confirm('Are you sure you want to delete this user?')
    if (res) {
      setIsLoading(true)
      await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      })
      getUsers()
    }
  }

  const createUser = async id => {
    setIsLoading(true)
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    setIsLoading(false)
  }

  const updateUser = async id => {
    setIsLoading(true)
    await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    setIsLoading(false)
  }

  const editUser = async id => {
    setIsLoading(true)
    const res = await fetch(`${API_URL}/users/${id}`)
    const data = await res.json()
    setIsLoading(false)
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
    setIsEditMode(true)
    setCurrentUserId(id)
  }

  return (
    <div className='row'>
      <div className='col-md-4'>
        <form onSubmit={handleSumbit} className='card card-body'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              required
              type='text'
              name='name'
              className='form-control mb-2'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              required
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
              required
              type='password'
              className='form-control mb-2'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-primary btn-block'>
            {isEditMode ? 'Edit' : 'Create'}
          </button>
        </form>
        {isLoading && <Spinner />}
      </div>

      <div className='col-md-8'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className='btn btn-secondary btn-sm btn-block'
                    onClick={() => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger btn-sm btn-block'
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
