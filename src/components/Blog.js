import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonVisibility = { display: visible ? (user.username === blog.user.username ? '' : 'none') : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    blog.likes++
    blogService.update(blog)
      .then(updatedBlog => {
        setBlogs(
          blogs.map(b => b.id === updatedBlog.id ? blog : b)
            .sort((a, b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
        )
      })
  }

  const remove = () => {
    blogService.remove(blog)
      .then(setBlogs(blogs.filter(b => b.id !== blog.id)))
  }

  return (
    <div className='blog-container'>
      <p className='text-hover' onClick={() => toggleVisibility()}>{blog.title} {blog.author}</p>
      <a href={blog.url} style={showWhenVisible}>{blog.url}</a>
      <p style={showWhenVisible}>{blog.likes} likes <button onClick={() => like()}>like</button></p>
      <p style={showWhenVisible}>Added by {blog.user.name}</p>
      <button style={buttonVisibility} onClick={() => remove()}>remove</button>
    </div>
  )
}

export default Blog