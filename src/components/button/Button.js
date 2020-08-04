import React from 'react'
import { Link } from 'react-router-dom'
import { makeClassNameDecorator } from '../../etc/utils'

const decorate = makeClassNameDecorator('button')

export function Button ({ mods, className, children, ...props }) {
  return <button className={decorate(mods, className)} {...props} type='button'>{children}</button>
}

export function SubmitButton ({ mods, className, children, ...props }) {
  return <button className={decorate(mods, className)} {...props} type='submit'>{children}</button>
}

export function InternalLinkButton ({ mods, className, children, ...props }) {
  return <Link className={decorate(mods, className)} {...props}>{children}</Link>
}

export function ExternalLinkButton ({ mods, className, children, ...props }) {
  return <a className={decorate(mods, className)} {...props}>{children}</a>
}

export default { Button, SubmitButton, InternalLinkButton, ExternalLinkButton }
