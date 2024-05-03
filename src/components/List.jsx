import React, { useState, useMemo, useCallback } from 'react'
import { FixedSizeList as ScrollList } from 'react-window';
import _ from 'lodash';
import Character from './Character'
import ListCharacter from './ListCharacter'
import { Box, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItemButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
};



export default function List() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
// Add side panel for displaying custom character component on hover/click, display related characters on the bottom based on related tags to selected character.
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

function cleanData(item) {
  return {
    ...item,
    "First Translation": typeof item["First Translation"] === 'string' ? item["First Translation"] : ''
  };
}

const label = { inputProps: { 'aria-label': 'Checkbox for level select' } };

const unfilteredList = [
  ...JSON.parse(localStorage.getItem("tocfl1")).map(cleanData), 
  ...JSON.parse(localStorage.getItem("tocfl2")).map(cleanData),
  ...JSON.parse(localStorage.getItem("tocfl3")).map(cleanData),
  ...JSON.parse(localStorage.getItem("tocfl4")).map(cleanData),
  ...JSON.parse(localStorage.getItem("tocfl5")).map(cleanData),
  ...JSON.parse(localStorage.getItem("tocfl6")).map(cleanData),
  ...JSON.parse(localStorage.getItem("tocfl7")).map(cleanData)
];


  const [item, setItem] = useState()
  
  const Row = ({ index, style, data }) => {
    const item = data[index];
    const handleClick = () => {
      setItem(item);
      handleOpen();
    };
    return (
      <>
      <ListItemButton style={style} onClick={handleClick}>
        <ListCharacter
          word={item.Word}
          firstTranslation={item["First Translation"]}
        />
      </ListItemButton>
      </>
    );
  };

  const [filterLevel, setFilterLevel] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const filteredItems = useMemo(() => {
    return unfilteredList.filter(item =>
      (filterLevel.length === 0 || filterLevel.includes(item.Level)) &&
      (item.Word.includes(inputValue) || item["First Translation"].includes(inputValue))
    );
  }, [filterLevel, inputValue]);

  const handleFilterChange = useCallback(_.debounce((value) => {
    setInputValue(value);
  }, 250), []);

  return(
<>
  <Grid container direction="row" justifyContent="center" spacing={8} >
    <Grid item >
      <Grid container direction="column" justifyContent="center" rowSpacing={2}>
        <Grid item>
          <TextField
            label="Character Search" variant="outlined" sx={{width:"100%"}}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="輸入......"
          />
        </Grid>
      <Grid item  >
      <FormControl  component="fieldset" >
        <FormLabel component="legend">TOCFL levels</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(1)}
            onChange={() => setFilterLevel(prev => prev.includes(1) ? prev.filter(l => l !== 1) : [...prev, 1])}/>}
            label="1"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(2)}
            onChange={() => setFilterLevel(prev => prev.includes(2) ? prev.filter(l => l !== 2) : [...prev, 2])}/>}
            label="2"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(3)}
            onChange={() => setFilterLevel(prev => prev.includes(3) ? prev.filter(l => l !== 3) : [...prev, 3])}/>}
            label="3"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(4)}
            onChange={() => setFilterLevel(prev => prev.includes(4) ? prev.filter(l => l !== 4) : [...prev, 4])}/>}
            label="4"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(5)}
            onChange={() => setFilterLevel(prev => prev.includes(5) ? prev.filter(l => l !== 5) : [...prev, 5])}/>}
            label="5"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(6)}
            onChange={() => setFilterLevel(prev => prev.includes(6) ? prev.filter(l => l !== 6) : [...prev, 6])}/>}
            label="6"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(7)}
            onChange={() => setFilterLevel(prev => prev.includes(7) ? prev.filter(l => l !== 7) : [...prev, 7])}/>}
            label="7"
          />
        </FormGroup>
      </FormControl>
    </Grid>
    <Grid item className='list--character' >
      <ScrollList
      height={450}
      width={500}
      itemSize={75}
      itemCount={filteredItems.length}
      itemData={filteredItems}
      >
        {Row}
      </ScrollList>
    </Grid>
  </Grid>
  </Grid>
    {matches && <Grid item alignContent="center">{item && <Character
      word={item.Word}
      pinyin={item.Pinyin}
      otherPinyin={item.OtherPinyin}
      level={item.Level}
      firstTranslation={item["First Translation"]}
      audio={true}
    />}
    </Grid>}
  </Grid>
  {!matches && <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={styleModal}>
          {item && <Character
            word={item.Word}
            pinyin={item.Pinyin}
            otherPinyin={item.OtherPinyin}
            level={item.Level}
            firstTranslation={item["First Translation"]}
            audio={true}
          />}
        </Box>
      </Modal>}
</>
  )
}

//gray bg.

{/* <Grid container direction="row" justifyContent="center">
    <Grid item>
      <Grid container direction="column" justifyContent="center" m={2} >
        <Grid item>
          <TextField
            label="Character Search" variant="outlined" sx={{minWidth:"394px", m:"10px"}}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="輸入......"
          />
        </Grid>
      <Grid item  sx={{minWidth:"394px", m:"10px"}}>
      <FormControl  component="fieldset">
        <FormLabel component="legend">TOCFL levels</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(1)}
            onChange={() => setFilterLevel(prev => prev.includes(1) ? prev.filter(l => l !== 1) : [...prev, 1])}/>}
            label="1"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(2)}
            onChange={() => setFilterLevel(prev => prev.includes(2) ? prev.filter(l => l !== 2) : [...prev, 2])}/>}
            label="2"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(3)}
            onChange={() => setFilterLevel(prev => prev.includes(3) ? prev.filter(l => l !== 3) : [...prev, 3])}/>}
            label="3"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(4)}
            onChange={() => setFilterLevel(prev => prev.includes(4) ? prev.filter(l => l !== 4) : [...prev, 4])}/>}
            label="4"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(5)}
            onChange={() => setFilterLevel(prev => prev.includes(5) ? prev.filter(l => l !== 5) : [...prev, 5])}/>}
            label="5"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(6)}
            onChange={() => setFilterLevel(prev => prev.includes(6) ? prev.filter(l => l !== 6) : [...prev, 6])}/>}
            label="6"
          />
          <FormControlLabel
            control={<Checkbox checked={filterLevel.includes(7)}
            onChange={() => setFilterLevel(prev => prev.includes(7) ? prev.filter(l => l !== 7) : [...prev, 7])}/>}
            label="7"
          />
        </FormGroup>
      </FormControl>
    </Grid>
  </Grid>
  <Grid container direction="row">
    <Grid item className='list--character'>
      <ScrollList
      height={450}
      width={500}
      itemSize={75}
      itemCount={filteredItems.length}
      itemData={filteredItems}
      >
      {Row}
      </ScrollList>
    </Grid>
  </Grid>
  </Grid>
    <Grid item   sx={{backgroundColor:"gray", width:"50%"}} >{item && <Character
      word={item.Word}
      pinyin={item.Pinyin}
      otherPinyin={item.OtherPinyin}
      level={item.Level}
      firstTranslation={item["First Translation"]}
      audio={true}
    />}
    </Grid>
  </Grid> */}