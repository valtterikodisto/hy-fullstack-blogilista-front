import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Toggable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      flashError('Invalid username or password')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogForm = (event) => {
    event.preventDefault()
    const newObject = { title: title, author: author, url: url }
    blogService.create(newObject).then(blog => setBlogs(blogs.concat(blog))).then(flashNotification(`Added: ${title} by ${author}`))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const flashNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const flashError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <ErrorMessage errorMessage={errorMessage} />
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Toggable buttonLabel='create new'>
        <h2>create new</h2>
        <BlogForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          handleBlogForm={handleBlogForm}
        />
      </Toggable>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} /> )}
    </div>
  )
}

export default App