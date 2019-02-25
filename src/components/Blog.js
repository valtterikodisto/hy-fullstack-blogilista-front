import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = async () => {
    blog.likes++
    blogService.update(blog)
      .then(updatedBlog => setBlogs(blogs.map(b => b.id === updatedBlog.id ? blog : b)))
  }

  return (
    <div className='blog-container'>
      <p className='text-hover' onClick={() => toggleVisibility()}>{blog.title} {blog.author}</p>
      <a href={blog.url} style={showWhenVisible}>{blog.url}</a>
      <p style={showWhenVisible}>{blog.likes} likes <button onClick={() => like()}>like</button></p>
      <p style={showWhenVisible}>Added by {blog.user.name}</p>
    </div>
  )
}

export default Blog