import React from 'react'

export default function Footer ({ className = '' }) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <p>Icons by <a href='https://fontawesome.com/' target='_blank' rel='nofollow noopener noreferrer'>FontAwesome</a>.<br /><a href='https://github.com/andrejcremoznik' target='_blank' rel='nofollow noopener noreferrer'>Framediff</a> is open source software.</p>
    </footer>
  )
}
