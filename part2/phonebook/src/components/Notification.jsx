import React from 'react'

const Notification = ({message}) => {
  if (message === null) { return null }
  console.log('message', message)
  console.log('message.type', message.type)
  return (
    <div className={message.type}>{message.text}</div>
  )
}

export default Notification