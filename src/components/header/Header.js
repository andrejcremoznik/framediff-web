import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/layers-alt.svg'

export default function Header ({ className = '', children }) {
  return (
    <header className={`header columns columns--middle columns--apart ${className}`.trim()}>
      <h1 className='logo column'>
        <Logo className='logo__image' title='FrameDiff, object size comparison' />
      </h1>
      <nav className='nav column'>
        <NavLink className='nav__item' to='/' exact>Compare</NavLink>
        <NavLink className='nav__item' to='/objects'>Manage objects</NavLink>
      </nav>
    </header>
  )
}
