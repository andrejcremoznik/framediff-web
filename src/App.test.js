import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Xyz name', () => {
  const { getByText } = render(
    <App />
  )
  expect(getByText(/Xyz/i)).toBeInTheDocument()
})
