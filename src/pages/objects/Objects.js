import React from 'react'
import ObjectsEditor from '../../features/objects/ObjectsEditor'
import ObjectsSessionStore from '../../features/objects/ObjectsSessionStore'

export default function Objects () {
  return (
    <>
      <h1>Manage objects</h1>
      <p>Here you can add custom objects for comparison. These will be stored locally in the browser. You can store them to the server for yourself with a unique passphrase or add them to the global database if you have the key from the admin.</p>
      <ObjectsEditor />
      <h2>Save or load an existing session</h2>
      <ObjectsSessionStore />
    </>
  )
}
