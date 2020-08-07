import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../../app/context'
import Autocomplete from '../../components/form/Autocomplete'
import Form from '../../components/form/Form'

export default function ObjectsPicker () {
  const { localObjects, objectsBeingCompared } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const objectsForAutocomplete = localObjects
    .filter(localObject => objectsBeingCompared
      .findIndex(objectBeingCompared => objectBeingCompared[3] === localObject[3]) < 0)
    .map(localObject => ({ id: localObject[3], text: localObject[2] }))

  function addObjectForComparison (id) {
    dispatch({
      type: 'addToComparison',
      payload: localObjects.find(object => object[3] === id)
    })
  }

  return (
    <Form.Wrapper>
      <Form.Row>
        <Autocomplete
          options={objectsForAutocomplete}
          onSelect={addObjectForComparison}
          label='Select objects for comparison'
        />
      </Form.Row>
      <Form.Row>
        {!!objectsBeingCompared.length && objectsBeingCompared.map(object => (
          <div key={object[3]}>
            <div>{object[2]}</div>
          </div>
        ))}
      </Form.Row>
    </Form.Wrapper>
  )
}
