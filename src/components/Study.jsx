import React, { useContext } from 'react'
import Character from './Character'
import SettingsContext from '../context/settingsContext';
// import { tocflOne } from '../vocabulary/tocfl-1';

export default function Study() {
  const [index, setIndex] = React.useState(0);
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl1")))
  const [currentCharacter, setCurrentCharacter] = React.useState("")
  const { userSettings } = useContext(SettingsContext);
  React.useEffect(() => {
    const levels = ['tocfl1', 'tocfl2', 'tocfl3'];
    const selectedLevelKey = levels.find(level => userSettings[level]) || 'tocfl1';
    
    const storedVocab = localStorage.getItem(selectedLevelKey);
    const vocabList = storedVocab ? JSON.parse(storedVocab) : [];

    setVocab(vocabList);
}, [userSettings]);

  React.useEffect(() => {
    setCurrentCharacter(vocab[index]);
  }, [index, vocab]);

  React.useEffect(() => {
    setIndex(0)
  }, [vocab])

  const increaseIndex = () => {
    setIndex(prevIndex => (prevIndex + 1) % vocab.length);
  };

  const decreaseIndex = () => {
    setIndex(prevIndex => (prevIndex - 1 + vocab.length) % vocab.length);
  };
  return(
    <>
      <h1>study mode</h1>
      <Character 
        word={currentCharacter.Word}
        pinyin={currentCharacter.Pinyin}
        OtherPinyin={currentCharacter.OtherPinyin}
        level={currentCharacter.Level}
        firstTranslation={currentCharacter["First Translation"]}
      />
      <button onClick={() => increaseIndex()}>Previous</button>
      <button onClick={() => decreaseIndex()}>Next</button>
    </>
  )
}