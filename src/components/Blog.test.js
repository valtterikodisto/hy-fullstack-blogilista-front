import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent,  } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

const user = {
  username: 'user'
}

const blog = {
  title: 'Blog',
  author: 'Author',
  url: 'www.test.fi',
  likes: 0,
  user: {
    name: 'User'
  }
}

const component = render(<Blog blog={blog} user={user} />)

test('additional information is revealed after button is clicked', () => {
  const div = component.container.querySelector('.text-hover')
  expect(div).toHaveTextContent('Blog Author')

  const additional = component.container.querySelector('.additional-info')
  expect(additional).toHaveStyle('display: none')

  fireEvent.click(div)
  expect(additional).toHaveStyle('display: ')

})