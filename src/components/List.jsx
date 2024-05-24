import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FixedSizeList as ScrollList } from 'react-window';
import _ from 'lodash';
import Character from './Character';
import ListCharacter from './ListCharacter';
import { Grid, TextField, Checkbox, FormControlLabel, FormControl, FormLabel, FormGroup, Modal, Box, ListItemButton, Chip, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
};

export default function List({ fetchTocfl, loading }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState();
    const [filterLevel, setFilterLevel] = useState([1]);
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const [unfilteredList, setUnfilteredList] = useState([])
    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    


    const handleTagClick = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag); // Deselect tag
            } else {
                return [...prev, tag]; // Select tag
            }
        });
    };

    const handleTagUpdate = (word, newTags) => {
        // Update the list with the new tags for the specified character
        const updatedList = unfilteredList.map(item => {
            if (item.W === word) {
                return { ...item, tags: newTags };
            }
            return item;
        });
        setUnfilteredList(updatedList);
    
        // Creating a new set for all tags currently in use after the update
        const tagsInUse = new Set();
        updatedList.forEach(item => item.tags.forEach(tag => tagsInUse.add(tag)));
    
        // Update the allTags to only include tags that are still in use
        setAllTags([...tagsInUse]);
    
        // Optionally, update selectedTags to remove any tags that are no longer in use
        setSelectedTags(prev => prev.filter(tag => tagsInUse.has(tag)));
    };
    
    

    function cleanData(item) {
      return {
          ...item,
          "T": typeof item.T === 'string' ? item.T : '',
          "tags": item.tags || []
      };
  }
  


  useEffect(() => {
    if (
        localStorage.getItem("TOCFL1") && localStorage.getItem("TOCFL2") && localStorage.getItem("TOCFL3") && localStorage.getItem("TOCFL4") && localStorage.getItem("TOCFL5") && localStorage.getItem("TOCFL6") && localStorage.getItem("TOCFL7")
    ) {
        const data = [
            ...JSON.parse(localStorage.getItem("TOCFL1")).map(cleanData), 
            ...JSON.parse(localStorage.getItem("TOCFL2")).map(cleanData),
            ...JSON.parse(localStorage.getItem("TOCFL3")).map(cleanData),
            ...JSON.parse(localStorage.getItem("TOCFL4")).map(cleanData),
            ...JSON.parse(localStorage.getItem("TOCFL5")).map(cleanData),
            ...JSON.parse(localStorage.getItem("TOCFL6")).map(cleanData),
            ...JSON.parse(localStorage.getItem("TOCFL7")).map(cleanData)
        ];
        setUnfilteredList(data);
        console.log("setting")
    } else {
        setUnfilteredList([]);
        console.log('not set');
    }
}, [loading]);

useEffect(() => {
    const loadData = () => {
        let loadedData = [];
        let allLoadedTags = new Set();
        
        ['TOCFL1', 'TOCFL2', 'TOCFL3', 'TOCFL4', 'TOCFL5', 'TOCFL6', 'TOCFL7'].forEach(level => {
            const storedData = localStorage.getItem(level);
            if (storedData) {
                const parsedData = JSON.parse(storedData).map(cleanData);
                loadedData = [...loadedData, ...parsedData];
                parsedData.forEach(item => item.tags && item.tags.forEach(tag => allLoadedTags.add(tag)));
            }
        });

        setUnfilteredList(loadedData);
        setAllTags([...allLoadedTags]);
    };

    loadData();
}, []);


useEffect(() => {
    [1, 2, 3, 4, 5, 6, 7].map((num) => {
        fetchTocfl(`TOCFL${num}`);
    })
  }, [])

  const filteredItems = useMemo(() => {
    let filteredByLevel = unfilteredList.filter(item => filterLevel.length === 0 || filterLevel.includes(item.L));

    let shouldFilterByTags = allTags.length > 0 && selectedTags.length > 0;
    let filteredByTags = shouldFilterByTags ? 
        filteredByLevel.filter(item => item.tags.some(tag => selectedTags.includes(tag))) :
        filteredByLevel;

    let finalFiltered = filteredByTags.filter(item =>
        item.W.includes(inputValue) || item.T.includes(inputValue)
    );

    return finalFiltered;
}, [filterLevel, inputValue, unfilteredList, selectedTags, allTags]);





    const handleFilterChange = useCallback(_.debounce((value) => {
        setInputValue(value);
    }, 200), []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

const Row = ({ index, style, data }) => {
  const item = data[index];
  const handleClick = () => {
      setItem(item);
      handleOpen();
  };
      return (
          <ListItemButton style={style} onClick={handleClick}>
              <ListCharacter
                  word={item.W}
                  firstTranslation={item.T}
              />
          </ListItemButton>
      );
  };

    return (
        <>
            <Grid container direction="row" justifyContent="center" spacing={14}>
                <Grid item>
                    <Grid container direction="column" justifyContent="center" rowSpacing={{ xs: 1, sm: 3 }} sx={{ width: { xs: "320px", sm: "445px" }}}>
                        <Grid item>
                            <TextField
                                label="Search by Character or Tag" variant="outlined" sx={{ width: { xs: "70%", sm: "95%" } }}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                placeholder="輸入......"
                            />
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">TOCFL levels</FormLabel>
                                <FormGroup row sx={{ width: { xs: "390px", sm: "450px" } }}>
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(1)}
                                    onChange={() => setFilterLevel(prev => prev.includes(1) ? prev.filter(l => l !== 1) : [...prev, 1])}/>}
                                    label="1"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(2)}
                                    onChange={() => setFilterLevel(prev => prev.includes(2) ? prev.filter(l => l !== 2) : [...prev, 2])}/>}
                                    label="2"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(3)}
                                    onChange={() => setFilterLevel(prev => prev.includes(3) ? prev.filter(l => l !== 3) : [...prev, 3])}/>}
                                    label="3"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(4)}
                                    onChange={() => setFilterLevel(prev => prev.includes(4) ? prev.filter(l => l !== 4) : [...prev, 4])}/>}
                                    label="4"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(5)}
                                    onChange={() => setFilterLevel(prev => prev.includes(5) ? prev.filter(l => l !== 5) : [...prev, 5])}/>}
                                    label="5"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(6)}
                                    onChange={() => setFilterLevel(prev => prev.includes(6) ? prev.filter(l => l !== 6) : [...prev, 6])}/>}
                                    label="6"
                                  />
                                  <FormControlLabel
                                    sx={{marginRight:{xs: 1, sm: 3}}}
                                    control={<Checkbox checked={filterLevel.includes(7)}
                                    onChange={() => setFilterLevel(prev => prev.includes(7) ? prev.filter(l => l !== 7) : [...prev, 7])}/>}
                                    label="7"
                                  />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                        
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: "370px" }}>
                            <FormLabel component="legend" sx={{mb: 0, alignSelf: 'center'}}>Tags:</FormLabel>
                                {allTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        variant="outlined"
                                        onClick={() => handleTagClick(tag)}
                                        color={selectedTags.includes(tag) ? 'primary' : 'default'} // Highlight if selected
                                    />
                                ))}
                            </Box>
                        </Grid>
                        <Grid item className='list--character'>
                            <ScrollList
                                height={400}
                                width={480}
                                itemSize={75}
                                itemCount={filteredItems.length}
                                itemData={filteredItems}
                            >
                                {Row}
                            </ScrollList>
                        </Grid>
                    </Grid>
                </Grid>
                {matches && <Grid item alignContent="center">
                    {item && <Character
                        key={item.W}
                        word={item.W}
                        pinyin={item.P}
                        
                        level={item.L}
                        firstTranslation={item.T}
                        audio={true}
                        initialTags={item?.tags}
                        tagsList={allTags}
                        onTagUpdate={(newTags) => handleTagUpdate(item.W, newTags)}
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
                        key={item.W}
                        word={item.W}
                        pinyin={item.P}
                        
                        level={item.L}
                        firstTranslation={item.T}
                        audio={true}
                        initialTags={item?.tags}
                        tagsList={allTags}
                        onTagUpdate={(newTags) => handleTagUpdate(item.W, newTags)}
                    />}
                </Box>
            </Modal>}
        </>
    );
}