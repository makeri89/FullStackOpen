import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <div>
      <div class='d-flex justify-content-between align-items-center'>
        <Link class='text-dark' to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        <span class='badge badge-primary badge-pill'>{blog.likes} likes</span>
      </div>
    </div>
  )
}

export default Blog