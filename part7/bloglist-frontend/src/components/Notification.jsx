import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  console.log(notification.type)
  // console.log('type', type)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div>
    {notification.notification !== '' &&(
      <div style={style}>
        {notification.notification}
      </div>
    )}
  </div>
}

export default Notification