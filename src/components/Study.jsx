import React, { useContext } from 'react'
import Character from './Character'
import SettingsContext from '../context/settingsContext';
import { Box, Button, ButtonGroup } from '@mui/material';
// import { tocflOne } from '../vocabulary/tocfl-1';

export default function Study() {
  const [index, setIndex] = React.useState(0);
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl1")))
  const [currentCharacter, setCurrentCharacter] = React.useState("")
  const { userSettings } = useContext(SettingsContext);
  React.useEffect(() => {
    const levels = ['tocfl1', 'tocfl2', 'tocfl3', 'tocfl4', 'tocfl5', 'tocfl6', 'tocfl7'];
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
    <Box display="flex" flexDirection="column" p={10} alignItems="center" gap={3}>
      <Character 
        word={currentCharacter.Word}
        pinyin={currentCharacter.Pinyin}
        OtherPinyin={currentCharacter.OtherPinyin}
        level={currentCharacter.Level}
        firstTranslation={currentCharacter["First Translation"]}
      />
      
        <ButtonGroup >
        <Button display="inline" variant="outlined" onClick={() => increaseIndex()}>Previous</Button>
        <Button display="inline" variant="outlined" onClick={() => decreaseIndex()}>Next</Button>
        </ButtonGroup>
      
    </Box>
  )
}