import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'Title',
  author: 'Author',
  likes: 0
}

const onClick = () => {
  console.log('click')
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} onClick={onClick}/>
  )

  const div = component.container.querySelector('.basic-info')
  expect(div).toHaveTextContent('Title Author')
})

it('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})