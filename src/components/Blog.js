import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog-container'>
      <p className='text-hover' onClick={() => toggleVisibility()}>{blog.title} {blog.author}</p>
      <a href={blog.url} style={showWhenVisible}>{blog.url}</a>
      <p style={showWhenVisible}>{blog.likes} likes <button>like</button></p>
      <p style={showWhenVisible}>Added by {blog.user.name}</p>
    </div>
  )
}

export default Blog