import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header ({ className = '', children }) {
  return (
    <header className={`header columns columns--middle columns--apart ${className}`.trim()}>
      <h1 className='logo column'>
        <div className='logo__image'>Logo</div>
      </h1>
      <nav className='nav column'>
        <NavLink className='nav__item' to='/' exact>Home</NavLink>
        <NavLink className='nav__item' to='/objects'>Manage objects</NavLink>
      </nav>
    </header>
  )
}
