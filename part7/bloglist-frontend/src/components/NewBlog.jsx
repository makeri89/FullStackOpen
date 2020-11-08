import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const dispatch = useDispatch()

  const notifyWith = (message, type='success') => {
    dispatch(setNotification(message, type, 5))
  }

  const addNewBlog = async(e) => {
    e.preventDefault()
    const author = e.target.author.value
    const title = e.target.title.value
    const url = e.target.url.value
    const newBlog = { author, title, url }
    dispatch(addBlog(newBlog))
    notifyWith(`A new blog ${title} added`)
    e.target.author.value = ''
    e.target.title.value = ''
    e.target.url.value = ''
  }

  return (
    <div>
      <h4>Add a new blog</h4>
      <form onSubmit={addNewBlog}>
        <div class='form-group'>
          <div class='form-row align-items-center p-1'>
            <input
              id='author'
              name='author'
              placeholder='author'
              class='shadow'
            />
          </div>
          <div class='form-row align-items-center p-1'>
            <input
              id='title'
              name='title'
              placeholder='title'
              class='shadow'
            />
          </div>
          <div class='form-row align-items-center p-1'>
            <input
              id='url'
              name='url'
              placeholder='url'
              class='shadow'
            />
          </div>
          <div class='form-row align-items-center p-1'>
            <button class='btn btn-sm btn-outline-success' id="create">create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewBlog