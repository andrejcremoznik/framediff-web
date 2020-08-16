import React from 'react'
import { useDocumentTitle } from '../../etc/customHooks'
import ObjectsComparison from '../../features/objects/ObjectsComparison'

export default function Home () {
  useDocumentTitle('Compare objects')

  return (
    <>
      <h1>Compare object sizes</h1>
      <ObjectsComparison />
    </>
  )
}
