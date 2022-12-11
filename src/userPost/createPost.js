import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/postSlice'

const CreatePost = () => {
  const [values, setValues] = useState({ title: '', body: '' })
  const [showPost, setShowPost] = useState(false)
  const dispatch = useDispatch()
  const { title, body } = values
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(values))
  }
  const goBack = () => {
    navigate('/')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a post</h1>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <br />
        <br />

        <textarea
          col={5}
          rows={3}
          placeholder="Enter body"
          onChange={(e) => setValues({ ...values, body: e.target.value })}
        />
        <br />
        <br />
        <br />

        <button type="submit" onClick={goBack}>
          Go back
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit form
        </button>
      </form>
    </div>
  )
}

export default CreatePost
