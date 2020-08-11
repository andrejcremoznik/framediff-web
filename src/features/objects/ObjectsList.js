import React, { useContext } from 'react'
import { StateContext } from '../../app/context'

export default function ObjectsList () {
  const { globalObjects } = useContext(StateContext)
  return (
    <div className='objects-list'>{globalObjects.map(globalObject =>
      <li key={globalObject[3]}>{globalObject[2]}</li>)}
    </div>
  )
}
