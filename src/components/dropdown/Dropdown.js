import React, { useState } from 'react'
import { Button } from '../button/Button'
import { makeClassNameDecorator } from '../../etc/utils'

const decorate = makeClassNameDecorator('dropdown')

export default function Dropdown ({ toggleText, pin = 'left', className, children, ...props }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={decorate([`pin-${pin}`], className)} data-state={open ? 'open' : 'closed'}>
      <Button
        className='dropdown__toggle'
        mods={['plain']}
        onClick={() => setOpen(!open)}
      >
        {toggleText}
      </Button>
      <div className='dropdown__content'>{children}</div>
      <div className='dropdown__backdrop' onClick={() => setOpen(false)} />
    </div>
  )
}
