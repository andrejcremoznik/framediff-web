import React, { useContext, useState } from 'react'
import { sessionsService, objectsService } from '../../app/feathers'
import { StateContext, DispatchContext } from '../../app/context'
import { decorateObjectData } from '../../etc/utils'
import { isLongerThan } from '../../etc/validate'
import Form from '../../components/form/Form'
import { Button } from '../../components/button/Button'

export default function ObjectsSessionStore () {
  const { localObjects } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const [loading, setLoading] = useState(false)
  const [passphrase, setPassphrase] = useState('')
  const [response, setResponse] = useState(['', 'default'])

  function isValid () {
    const errors = []
    if (!isLongerThan(6)(passphrase)) {
      errors.push('Please use a longer passphrase.')
    }
    if (errors.length) {
      setResponse([errors.join(' '), 'error'])
      return false
    } else {
      setResponse(['', 'default'])
      return true
    }
  }

  async function loadSession () {
    if (!isValid()) return
    setLoading(true)
    try {
      const session = await sessionsService.find({ query: { secret: passphrase } })
      if (session.data.length) {
        if (localObjects.length && !window.confirm('Loading saved session data will override your existing objects. Proceed anyway?')) return
        dispatch({
          type: 'setLocalObjects',
          payload: session.data[0].objects.map(decorateObjectData)
        })
      } else {
        setResponse(['No stored data has been found for the provided passphrase.', 'error'])
      }
    } catch (err) {
      setResponse([err.message, 'error'])
    } finally {
      setLoading(false)
    }
  }

  async function saveSession () {
    if (!isValid()) return
    setLoading(true)
    try {
      await sessionsService.create({
        secret: passphrase,
        objects: localObjects.map(object => object.slice(0, 3))
      })
      setResponse(['Session saved.', 'success'])
    } catch (err) {
      setResponse([err.message, 'error'])
    } finally {
      setLoading(false)
    }
  }

  function saveGlobalObjects () {
    if (!isValid()) return
    setLoading(true)
    Promise
      .allSettled(localObjects.map(object => objectsService.create({
        secret: passphrase,
        object: object.slice(0, 3)
      })))
      .then(rsp => {
        const responses = []
        rsp.forEach((result, idx) => {
          if (result.status === 'rejected') {
            responses.push([`${localObjects[idx][2]}: ${result.reason?.message || 'Unknown error.'}`, 'error'])
          } else {
            responses.push([`${localObjects[idx][2]}: Saved.`, 'success'])
            dispatch({
              type: 'removeLocalObject',
              payload: localObjects[localObjects.findIndex(obj => obj[2] === result.value.title)][3]
            })
          }
        })
        const responseHtml = <ul>{responses.map(([msg, type], idx) => <li key={idx} className={`c--${type}`}>{msg}</li>)}</ul>
        setResponse([responseHtml, 'default'])
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form.Wrapper>
      <Form.Row>
        <Form.TextField
          type='password'
          name='secret'
          label='Passphrase'
          hint='A unique string used to identify your session.'
          onChange={e => setPassphrase(e.target.value)}
          value={passphrase}
        />
      </Form.Row>
      <Form.Row className='columns columns--gaps'>
        <div className='column'>
          <Button mods={['block', 'primary']} onClick={loadSession} disabled={loading}>Load session</Button>
        </div>
        <div className='column'>
          <Button mods={['block', 'primary']} onClick={saveSession} disabled={loading || localObjects.length < 1}>Save session</Button>
        </div>
        <div className='column'>
          <Button mods={['block', 'default']} onClick={saveGlobalObjects} disabled={loading || localObjects.length < 1}>Save objects globally</Button>
        </div>
      </Form.Row>
      {response[0] && <Form.Response type={response[1]}>{response[0]}</Form.Response>}
    </Form.Wrapper>
  )
}
