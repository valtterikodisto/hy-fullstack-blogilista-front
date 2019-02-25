import React from 'react'

const BlogForm = ({ title, author, url, handleBlogForm }) => {
  return (
    <>
    <form onSubmit={handleBlogForm}>
      <div>
        title
        <input
          {...title}
          name="Title"
        />
        <button onClick={title.reset}>reset</button>
      </div>
      <div>
        author
        <input
          {...author}
          name="Author"
        />
        <button onClick={author.reset}>reset</button>
      </div>
      <div>
        url
        <input
          {...url}
          name="Url"
        />
        <button onClick={url.reset}>reset</button>
      </div>

      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default BlogForm