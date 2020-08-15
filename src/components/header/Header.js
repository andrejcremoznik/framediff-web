import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { StateContext, DispatchContext } from '../../app/context'
import { Button } from '../button/Button'
import { ReactComponent as Logo } from '../../assets/layers-alt.svg'
import { ReactComponent as IconSun } from '../../assets/sun.svg'
import { ReactComponent as IconMoon } from '../../assets/moon.svg'

export default function Header ({ className = '', children }) {
  const { theme } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const toggleTheme = () => dispatch({
    type: 'setTheme',
    payload: theme === 'dark' ? 'light' : 'dark'
  })

  return (
    <header className={`header columns columns--middle columns--apart ${className}`.trim()}>
      <h1 className='logo column'>
        <Logo className='logo__image' title='FrameDiff, object size comparison' />
      </h1>
      <nav className='nav column'>
        <NavLink className='nav__item' to='/' exact>Compare</NavLink>
        <NavLink className='nav__item' to='/objects'>Manage objects</NavLink>
      </nav>
      <div className='theme-switcher column'>
        <Button mods={['symbol', 'plain']} onClick={toggleTheme} aria-label='Change theme'>{theme === 'day' ? <IconMoon /> : <IconSun />}</Button>
      </div>
    </header>
  )
}
