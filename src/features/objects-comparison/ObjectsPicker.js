import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../../app/context'
import { randomColor } from '../../etc/utils'
import Autocomplete from '../../components/form/Autocomplete'
import Form from '../../components/form/Form'
import { Button } from '../../components/button/Button'

export default function ObjectsPicker () {
  const { localObjects, objectsBeingCompared } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const objectsForAutocomplete = localObjects
    .filter(localObject => objectsBeingCompared
      .findIndex(objectBeingCompared => objectBeingCompared[3] === localObject[3]) < 0)
    .map(localObject => ({ id: localObject[3], text: localObject[2] }))

  const addObjectForComparison = id => dispatch({
    type: 'addToComparison',
    payload: id
  })

  const removeObjectFromComparison = id => () => dispatch({
    type: 'removeFromComparison',
    payload: id
  })

  const randomizeColor = id => () => dispatch({
    type: 'setComparedObjectColor',
    payload: [id, randomColor()]
  })

  return (
    <Form.Wrapper>
      <Form.Row>
        <Autocomplete
          options={objectsForAutocomplete}
          onSelect={addObjectForComparison}
          label='Select objects for comparison'
        />
      </Form.Row>
      <Form.Row className='objects-picker__items'>
        {!!objectsBeingCompared.length && objectsBeingCompared.map(object => (
          <div key={object[3]} className='objects-picker__item'>
            <div className='objects-picker__item-legend' style={{ backgroundColor: object[4] }} onClick={randomizeColor(object[3])} />
            <div className='objects-picker__item-title'>{object[2]}</div>
            <Button className='objects-picker__item-x' mods={['plain', 'x']} onClick={removeObjectFromComparison(object[3])}>×</Button>
          </div>
        ))}
      </Form.Row>
    </Form.Wrapper>
  )
}
