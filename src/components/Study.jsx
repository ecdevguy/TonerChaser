import React, { useContext } from 'react'
import Character from './Character'
import SettingsContext from '../context/settingsContext';
import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';

// import { TOCFLOne } from '../vocabulary/TOCFL-1';

export default function Study() {
  const [index, setIndex] = React.useState(0);
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("TOCFL1")))
  const [currentCharacter, setCurrentCharacter] = React.useState("")
  const { userSettings, setUserSettings } = useContext(SettingsContext);
  React.useEffect(() => {
    const levels = ['TOCFL1', 'TOCFL2', 'TOCFL3', 'TOCFL4', 'TOCFL5', 'TOCFL6', 'TOCFL7'];
    const selectedLevelKey = levels.find(level => userSettings[level]) || 'TOCFL1';
    
    const storedVocab = localStorage.getItem(selectedLevelKey);
    const vocabList = storedVocab ? JSON.parse(storedVocab) : [];

    setVocab(vocabList);
}, [userSettings]);

  React.useEffect(() => {
    setUserSettings(prevSettings => ({
      ...prevSettings,
      TOCFL1: true,
      TOCFL2: false,
      TOCFL3: false,
      TOCFL4: false,
      TOCFL5: false,
      TOCFL6: false,
      TOCFL7: false
  }));
  }, [])
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

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setUserSettings(prevSettings => ({
        ...prevSettings,
        TOCFL1: newLevel === 'TOCFL1',
        TOCFL2: newLevel === 'TOCFL2',
        TOCFL3: newLevel === 'TOCFL3',
        TOCFL4: newLevel === 'TOCFL4',
        TOCFL5: newLevel === 'TOCFL5',
        TOCFL6: newLevel === 'TOCFL6',
        TOCFL7: newLevel === 'TOCFL7'
    }));
};
  return(
    <Box display="flex" flexDirection="column" p={6} alignItems="center" gap={3}>
      <Character 
        key={currentCharacter?.Word}
        word={currentCharacter?.Word}
        pinyin={currentCharacter?.Pinyin}
        OtherPinyin={currentCharacter?.OtherPinyin}
        level={currentCharacter?.Level}
        firstTranslation={currentCharacter?.["First Translation"]}
        initialTags={currentCharacter?.tags}
      />
      
        <ButtonGroup >
        <Button display="inline" variant="outlined" onClick={() => increaseIndex()}>Previous</Button>
        <Button display="inline" variant="outlined" onClick={() => decreaseIndex()}>Next</Button>
        </ButtonGroup>
        <FormControl component="fieldset">
  <FormLabel component="legend" sx={{paddingLeft: 4}}>
    Level select
  </FormLabel>
  <RadioGroup row sx={{width:{xs: "320px", sm: "450px"}, paddingLeft: 8}}>
    <FormControlLabel
        label="TOCFL 1"
        value="TOCFL1"
        control={<Radio checked={userSettings.TOCFL1}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 2"
        value="TOCFL2"
        control={<Radio checked={userSettings.TOCFL2}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 3"
        value="TOCFL3"
        control={<Radio checked={userSettings.TOCFL3}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 4"
        value="TOCFL4"
        control={<Radio checked={userSettings.TOCFL4}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 5"
        value="TOCFL5"
        control={<Radio checked={userSettings.TOCFL5}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 6"
        value="TOCFL6"
        control={<Radio checked={userSettings.TOCFL6}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 7"
        value="TOCFL7"
        control={<Radio checked={userSettings.TOCFL7}
        onChange={handleLevelChange}/>}
    />
  </RadioGroup>
</FormControl>
    </Box>
  )
}



