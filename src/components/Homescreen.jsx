import React from 'react'

export default function Homescreen(props) {
    return (
    <div className="homescreen--container">
      <h1>Tone Chaser</h1>
      <button onClick={() => props.handleClick('study')}>Study</button>
      <button onClick={() => props.handleClick('challenge')}>Challenge</button>
      <button onClick={() => props.handleClick('list')}>List</button>
      <button onClick={() => props.handleClick('settings')}>Settings</button>
    </div>
    )
}