import React from 'react'
import Character from './Character'

export default function List(props) {
  const vocab = props.currentVocab.map(x => 
  <Character 
    word={x.Word}
    pinyin={x.Pinyin}
    otherPinyin={x.OtherPinyin}
    level={x.Level}
    firstTranslation={x["First Translation"]}
  />)
  return(
    <>
      <h1>list mode</h1>
      {vocab}
    </>
  )
}