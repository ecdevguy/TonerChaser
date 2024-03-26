import React from 'react'

export default function Character(props) {
  return (
    <div>
      <span>{props.word}</span>
      <span>{props.pinyin}</span>
      <span>{props.otherPinyin}</span>
      <span>{props.level}</span>
      <span>{props.pinyin}</span>
    </div>
  )
}