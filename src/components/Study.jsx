import React from 'react'
import Character from './Character'

export default function Study(props) {
  return(
    <>
      <h1>study mode</h1>
      <Character 
        word={props.currentCharacter.Word}
        pinyin={props.currentCharacter.Pinyin}
        otherPinyin={props.currentCharacter.OtherPinyin}
        level={props.currentCharacter.Level}
        firstTranslation={props.currentCharacter["First Translation"]}
      />
      <button onClick={() => props.handlePrevious()}>Previous</button>
      <button onClick={() => props.handleNext()}>Next</button>
    </>
  )
}