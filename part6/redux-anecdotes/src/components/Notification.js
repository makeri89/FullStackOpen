import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.message.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log('Notification', notification)
  return (
    <div>
      {notification !== '' && (
      <div style={style}>
        {notification.message}
      </div>
      )}
    </div>
  )
}

export default Notification