import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">ToneChaser</Link>
      <nav>
        <NavLink to="study">study</NavLink>
        <NavLink to="challenge">challenge</NavLink>
        <NavLink to="list">list</NavLink>
        <NavLink to="settings">settings</NavLink>
      </nav>
    </header>
  )
}

export default Header