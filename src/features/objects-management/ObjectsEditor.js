import React, { useState, useContext, useEffect } from 'react'
import { nanoid } from 'nanoid/non-secure'
import Form from '../../components/form/Form'
import { Button } from '../../components/button/Button'
import { isLongerThan } from '../../etc/validate'
import { StateContext, DispatchContext } from '../../app/context'
import { objects as objectsLocalStorage } from '../../app/storage'

export default function ObjectsEditor () {
  const [title, setTitle] = useState('')
  const [width, setWidth] = useState('0.0')
  const [height, setHeight] = useState('0.0')
  const [error, setError] = useState('')
  const dispatch = useContext(DispatchContext)
  const { localObjects } = useContext(StateContext)

  // Persist objects in context whenever they change
  useEffect(() => {
    objectsLocalStorage.set(localObjects)
  }, [localObjects])

  function addObject (e) {
    e.preventDefault()
    setError('')

    const errors = []
    const trimmedTitle = title.trim()
    const numericWidth = Number.parseFloat(width)
    const numericHeight = Number.parseFloat(height)

    if (Number.isNaN(numericWidth) || Number.isNaN(numericHeight)) {
      errors.push('Width and height must be numbers in millimeters.')
    } else {
      if (numericWidth <= 0 || numericHeight <= 0) {
        errors.push('Width and height must be greater than 0.')
      }
    }
    if (!isLongerThan(5)(trimmedTitle)) {
      errors.push('Title is too short.')
    }
    if (errors.length) {
      setError(errors.join(' '))
      return
    }

    // Add new object to context
    dispatch({
      type: 'addLocalObject',
      payload: [numericWidth, numericHeight, trimmedTitle, nanoid()]
    })
    e.target.reset()
    setTitle('')
    setWidth('0.0')
    setHeight('0.0')
  }

  return (
    <div className='objects-editor'>
      <Form.Wrapper className='objects-editor__form' onSubmit={addObject}>
        <Form.Row>
          <Form.TextField
            type='text'
            name='title'
            label='Title'
            value={title}
            required
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Row>
        <div className='columns columns--gaps'>
          <Form.Row className='column'>
            <Form.TextField
              type='number'
              name='width'
              step='0.1'
              min='0.1'
              label='Width (mm)'
              value={width}
              required
              onChange={e => setWidth(e.target.value)}
            />
          </Form.Row>
          <Form.Row className='column'>
            <Form.TextField
              type='number'
              name='height'
              step='0.1'
              min='0.1'
              label='Height (mm)'
              value={height}
              required
              onChange={e => setHeight(e.target.value)}
            />
          </Form.Row>
        </div>
        <Form.Row>
          <Form.Button mods={['primary']}>Add object</Form.Button>
        </Form.Row>
        {error && <Form.Response type='error'>{error}</Form.Response>}
      </Form.Wrapper>
      <hr />
      <div className='objects-editor__list'>
        {localObjects.map(([width, height, title, key]) => (
          <div key={key} className='objects-editor__list-row columns columns--gaps'>
            <div className='column double'>{title}</div>
            <div className='column'>{width} mm × {height} mm</div>
            <div className='column column--autosize'>
              <Button mods={['s']} onClick={() => dispatch({ type: 'removeLocalObject', payload: key })}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
