import React, { useContext } from 'react'
import { StateContext } from '../../app/context'

export default function ObjectsList () {
  const { globalObjects } = useContext(StateContext)
  return (
    <div className='objects-list'>{globalObjects.map(([w, h, title, id]) =>
      <li key={id}>{title} <small>{`(${w} mm × ${h} mm)`}</small></li>)}
    </div>
  )
}
