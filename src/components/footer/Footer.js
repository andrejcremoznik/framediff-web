import React from 'react'

export default function Footer ({ className = '' }) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <p>Unicons by <a href='https://iconscout.com/unicons/' target='_blank' rel='nofollow noopener noreferrer'>Iconscout</a>.<br /><b>FrameDiff</b> is open source software.</p>
    </footer>
  )
}
