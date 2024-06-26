import React, { useContext } from 'react'
import Character from './Character'
import SettingsContext from '../context/settingsContext';
import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';



export default function Study({ fetchTocfl, loading }) {
  const [index, setIndex] = React.useState(0);
  const [vocab, setVocab] = React.useState([]);
  const [currentCharacter, setCurrentCharacter] = React.useState('')
  const { userSettings, setUserSettings } = useContext(SettingsContext);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    const levels = ['TOCFL1', 'TOCFL2', 'TOCFL3', 'TOCFL4', 'TOCFL5', 'TOCFL6', 'TOCFL7'];
    const selectedLevelKey = levels.find(level => userSettings[level]) || 'TOCFL1';
    
    const storedVocab = localStorage.getItem(selectedLevelKey);
    const vocabList = storedVocab ? JSON.parse(storedVocab) : [];

    setVocab(vocabList);
}, [userSettings, loading]);

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
    if (vocab.length > 0 && vocab.length > index) {
      setCurrentCharacter(vocab[index]);
    }
  }, [index, vocab]);


  React.useEffect(() => {
    if (vocab.length > 0) {
      setIndex(0);
    } else {
      setIndex(-1);
    }
  }, [vocab]);
  

  const increaseIndex = () => {
    setIndex(prevIndex => (prevIndex + 1) % vocab.length);
  };

  const decreaseIndex = () => {
    setIndex(prevIndex => (prevIndex - 1 + vocab.length) % vocab.length);
  };

  const handleLevelChange = async (event) => {
    const newLevel = event.target.value;
    await fetchTocfl(newLevel, (err) => {
        if (err) {
            setError('Failed to fetch vocabulary.');
            setVocab([]);
        } else {
            setError('');
        }
    });
    setUserSettings(prevSettings => ({
        ...prevSettings,
        TOCFL1: newLevel === 'TOCFL1',
        TOCFL2: newLevel === 'TOCFL2',
        TOCFL3: newLevel === 'TOCFL3',
        TOCFL4: newLevel === 'TOCFL4',
        TOCFL5: newLevel === 'TOCFL5',
        TOCFL6: newLevel === 'TOCFL6',
        TOCFL7: newLevel === 'TOCFL7'
        })
      );
};
React.useEffect(() => {
  fetchTocfl("TOCFL1")
}, [])

  return(
    <Box display="flex" flexDirection="column" p={6} alignItems="center" gap={3}>
      <Character 
        key={currentCharacter?.W}
        word={currentCharacter?.W}
        pinyin={currentCharacter?.P}
        firstTranslation={currentCharacter?.T}
        initialTags={currentCharacter?.tags}
        level={currentCharacter?.L}
      />
      
        <ButtonGroup >
        <Button display="inline" variant="outlined" onClick={() => increaseIndex()}>Previous</Button>
        <Button display="inline" variant="outlined" onClick={() => decreaseIndex()}>Next</Button>
        </ButtonGroup>
        <FormControl component="fieldset">
  <FormLabel component="legend" sx={{paddingLeft: 4}}>
    Level select
  </FormLabel>
    <RadioGroup row sx={{ width: { xs: "320px", sm: "450px" } }}>
      {[1, 2, 3, 4, 5, 6, 7].map(level => (
        <FormControlLabel
          key={level}
          label={`TOCFL ${level}`}
          value={`TOCFL${level}`}
          control={<Radio checked={userSettings[`TOCFL${level}`]} />}
          onChange={handleLevelChange}
        />
      ))}
    </RadioGroup>
</FormControl>
    </Box>
  )
}



