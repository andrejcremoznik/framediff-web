import React from 'react'
import { domId } from '../../etc/utils'
import { SubmitButton } from '../button/Button'

export function Wrapper ({ className = '', children, ...props }) {
  return <form className={`form ${className}`.trim()} {...props}>{children}</form>
}

export function Row ({ className = '', children, ...props }) {
  return <div className={`form__row ${className}`.trim()} {...props}>{children}</div>
}

export function Button ({ children, ...props }) {
  return <SubmitButton {...props}>{children}</SubmitButton>
}

export function TextField ({ type, id = domId(), label, hint, ...props }) {
  return (
    <>
      <label className='form__label' htmlFor={id}>{label}</label>
      <input className={`form__field form__field--${type}`} {...props} id={id} type={type} />
      {hint && <small className='form__hint'>{hint}</small>}
    </>
  )
}

export function TextareaField ({ id = domId(), label, hint, ...props }) {
  return (
    <>
      <label className='form__label' htmlFor={id}>{label}</label>
      <textarea className='form__field form__field--textarea' {...props} id={id} />
      {hint && <small className='form__hint'>{hint}</small>}
    </>
  )
}

export function SelectField ({ label, hiddenLabel = false, hint, options, id = domId(), ...props }) {
  return (
    <>
      <label className={`form__label${hiddenLabel && ' visuallyhidden'}`} htmlFor={id}>{label}</label>
      <select className='form__field form__field--select' {...props} id={id}>
        {options.map(([value, label]) =>
          <option key={value} value={value}>{label}</option>)}
      </select>
      {hint && <small className='form__hint'>{hint}</small>}
    </>
  )
}

export function RadioField ({ label, hiddenLabel = false, ...props }) {
  return (
    <label className={`form__toggle from__toggle--radio form__toggle--label-${hiddenLabel ? 'hidden' : 'visible'}`}>
      <input className='form__field form__field--radio' type='radio' {...props} />
      {hiddenLabel
        ? <span className='visuallyhidden'>{label}</span>
        : label}
    </label>
  )
}

export function CheckboxField ({ label, hiddenLabel = false, ...props }) {
  return (
    <label className={`form__toggle from__toggle--checkbox form__toggle--label-${hiddenLabel ? 'hidden' : 'visible'}`}>
      <input className='form__field form__field--checkbox' type='checkbox' {...props} />
      {hiddenLabel
        ? <span className='visuallyhidden'>{label}</span>
        : label}
    </label>
  )
}

export function Response ({ type, children }) {
  return <div className={`form__response form__response--${type}`}>{children}</div>
}

export default {
  Wrapper,
  Row,
  Button,
  TextField,
  TextareaField,
  SelectField,
  RadioField,
  CheckboxField,
  Response
}
