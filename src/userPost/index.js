import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPost,
  deletePost,
  setEdit,
  updatePost,
} from '../redux/features/postSlice'

const Home = () => {
  const [id, setId] = useState('')
  const [bodyText, setBodyText] = useState()
  const dispatch = useDispatch()
  const { loading, post, error, body, edit } = useSelector((state) => state.app)
  const navigate = useNavigate()

  useEffect(() => {
    setBodyText(body)
  }, [body])

  const fetchUserPost = () => {
    if (!id) {
      window.alert('somethign wrong, please add an id')
    } else {
      dispatch(getPost({ id }))
      setId('')
    }
  }

  const handleEdit = () => {
    dispatch(setEdit({ edit: true, body: post[0].body }))
  }
  const handleCancelEdit = () => {
    dispatch(setEdit({ edit: false, body: '' }))
  }

  const handleSaveEditing = () => {
    dispatch(
      updatePost({
        id: post[0].id,
        title: post[0].title,
        body: bodyText,
      }),
      dispatch(setEdit({ edit: false, body: '' })),
    )
  }
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Fetch post</h1>
      <input
        type="number"
        onChange={(e) => setId(e.target.value)}
        value={id}
        placeholder="Enter id"
      />
      <button type="text" onClick={fetchUserPost}>
        Fetch user post
      </button>
      <button type="text" onClick={() => navigate('/createPost')}>
        Create user post
      </button>
      {post.length > 0 && (
        <>
          <p>ID: {post[0].id}</p>
          <p>Title: {post[0].title}</p>

          {edit ? (
            <>
              <input
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                type="textarea"
              />
              <button type="button" onClick={handleSaveEditing}>
                Save
              </button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <p>Body: {post[0].body}</p>
          )}
          <br />
          <br />
          {!edit && (
            <>
              <button
                onClick={() => dispatch(deletePost(post[0].id))}
                type="button"
              >
                Delete
              </button>
              <br />
              <br />
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Home
