import React from 'react'

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage) {
    return <div className="notification error-notification">{errorMessage}</div>
  }

  return null
}

export default ErrorMessage