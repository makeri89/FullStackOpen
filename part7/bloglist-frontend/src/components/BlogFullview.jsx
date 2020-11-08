import React from 'react'
import { Link } from 'react-router-dom'

const BlogFullview = ({ blog, handleLike, handleRemove, own }) => {

    if (!blog) {
        return null
    }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <ul class='list-group list-group-flush'>
        <li class='list-group-item m-1 rounded-lg shadow'>
          <a href={blog.url} class='list-group-item-action'>{blog.url}</a>
        </li>
        <li class='list-group-item m-1 rounded-lg shadow'>
          {blog.likes} likes
          <button class='btn btn-sm btn-outline-primary ml-3' onClick={() => handleLike(blog.id)}>Like</button>
        </li>
        <li class='list-group-item m-1 rounded-lg shadow'>
          Added by {blog.user.name}
        </li>
        <li class='list-group-item m-1 rounded-lg shadow'>
          {own&&<button class='btn btn-sm btn-outline-danger' onClick={() => handleRemove(blog.id)}>Remove</button>}
        </li>
        <li class='list-group-item m-1 rounded-lg shadow bg-secondary'>
          <Link class='text-white' to='/'>Back home</Link>
        </li>
      </ul>
    </div>
  )
}

export default BlogFullview