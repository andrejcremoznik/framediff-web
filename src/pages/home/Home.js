import React from 'react'
import ObjectsPicker from '../../features/objects-comparison/ObjectsPicker'
import ObjectsCanvas from '../../features/objects-comparison/ObjectsCanvas'

export default function Home () {
  return (
    <>
      <h1>Compare object sizes</h1>
      <ObjectsPicker />
      <ObjectsCanvas />
    </>
  )
}
