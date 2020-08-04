import React from 'react'

export default function Splash ({ type = 'default', children }) {
  return (
    <div className={`splash splash--${type}`}>
      <div className='splash__contents'>{children}</div>
    </div>
  )
}
