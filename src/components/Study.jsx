import React, { useContext } from 'react'
import Character from './Character'
import SettingsContext from '../context/settingsContext';
import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';

// import { tocflOne } from '../vocabulary/tocfl-1';

export default function Study() {
  const [index, setIndex] = React.useState(0);
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl1")))
  const [currentCharacter, setCurrentCharacter] = React.useState("")
  const { userSettings, setUserSettings } = useContext(SettingsContext);
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

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setUserSettings(prevSettings => ({
        ...prevSettings,
        tocfl1: newLevel === 'tocfl1',
        tocfl2: newLevel === 'tocfl2',
        tocfl3: newLevel === 'tocfl3',
        tocfl4: newLevel === 'tocfl4',
        tocfl5: newLevel === 'tocfl5',
        tocfl6: newLevel === 'tocfl6',
        tocfl7: newLevel === 'tocfl7'
    }));
};
  return(
    <Box display="flex" flexDirection="column" p={6} alignItems="center" gap={3}>
      <Character 
        word={currentCharacter?.Word}
        pinyin={currentCharacter?.Pinyin}
        OtherPinyin={currentCharacter?.OtherPinyin}
        level={currentCharacter?.Level}
        firstTranslation={currentCharacter?.["First Translation"]}
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
        value="tocfl1"
        control={<Radio checked={userSettings.tocfl1}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 2"
        value="tocfl2"
        control={<Radio checked={userSettings.tocfl2}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 3"
        value="tocfl3"
        control={<Radio checked={userSettings.tocfl3}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 4"
        value="tocfl4"
        control={<Radio checked={userSettings.tocfl4}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 5"
        value="tocfl5"
        control={<Radio checked={userSettings.tocfl5}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 6"
        value="tocfl6"
        control={<Radio checked={userSettings.tocfl6}
        onChange={handleLevelChange}/>}
    />
    <FormControlLabel
        label="TOCFL 7"
        value="tocfl7"
        control={<Radio checked={userSettings.tocfl7}
        onChange={handleLevelChange}/>}
    />
  </RadioGroup>
</FormControl>
    </Box>
  )
}



