import React, { useState, useEffect, useRef, useCallback } from 'react'
import { domId } from '../../etc/utils'
import { useEventListener } from '../../etc/customHooks'
import { KEYCODE } from '../../etc/constants'

export default function Autocomplete ({ id = domId(), label, hint, options, onSelect, ...props }) {
  const [candidates, setCandidates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [focusIndex, setFocusIndex] = useState(0)
  const autocompleteElement = useRef(null)

  useEffect(() => {
    if (!searchTerm.length) {
      setCandidates([])
      return
    }
    const searchTermNormalized = searchTerm.toLowerCase()
    const results = options.filter(option =>
      option.text.toLowerCase().indexOf(searchTermNormalized) > -1)
    setCandidates(results)
    setFocusIndex(0)
  }, [searchTerm, options])

  const handleKeyboard = useCallback(e => {
    switch (e.keyCode) {
      case KEYCODE.UP:
        e.preventDefault()
        setFocusIndex(Math.max(0, focusIndex - 1))
        break
      case KEYCODE.DOWN:
        e.preventDefault()
        setFocusIndex(Math.min(focusIndex + 1, candidates.length - 1))
        break
      case KEYCODE.ENTER:
        e.preventDefault()
        if (!candidates[focusIndex]) return
        onSelect(candidates[focusIndex].id)
        setSearchTerm('')
        break
      case KEYCODE.ESCAPE:
        setSearchTerm('')
        break
      default:
    }
  }, [focusIndex, setFocusIndex, setSearchTerm, onSelect, candidates])

  useEventListener('keydown', handleKeyboard, autocompleteElement)

  return (
    <>
      <label className='form__label' htmlFor={id}>{label}</label>
      <div className='form__autocomplete' data-state={candidates.length ? 'active' : 'inactive'} ref={autocompleteElement}>
        <div className='form__autocomplete-backdrop' onClick={() => setSearchTerm('')} />
        <input
          className='form__autocomplete-input form__field form__field--text'
          id={id}
          type='text'
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          {...props}
        />
        <div className='form__autocomplete-results'>
          {candidates.map(({ text, id }, idx) => (
            <div
              key={id}
              className='form__autocomplete-result'
              onClick={() => {
                onSelect(id)
                setSearchTerm('')
              }}
              tabIndex={idx === focusIndex ? '0' : '-1'}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      {hint && <small className='form__hint'>{hint}</small>}
    </>
  )
}
