import React from 'react'
import Splash from '../../components/splash/Splash'
import { InternalLinkButton } from '../../components/button/Button'

export default function NotFound () {
  return (
    <Splash type='error'>
      <h1>Page not found <small>404</small></h1>
      <p><InternalLinkButton to='/'>Home</InternalLinkButton></p>
    </Splash>
  )
}
