import React, { useContext, useState, useEffect } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography, Chip, ButtonGroup, Container, Modal, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { BrushOutlined, EditOff, VolumeUp, Close, VolumeOff } from '@mui/icons-material';
import ChineseCharacter from './ChineseCharacter';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 202,
    height: 202,
    bgcolor: 'background.paper',
    border: '1px solid #969696',
    boxShadow: 24,
    p: 0,
  };

  const styleAudio = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    bgcolor: 'background.paper',
    border: '2px solid #969696',
    boxShadow: 24,
    p: 3,
  };

export default function Character({ word, pinyin, otherPinyin, level, firstTranslation, initialTags }) {
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    const [writingMode, setWritingMode] = useState(false);
    const [tags, setTags] = useState(initialTags || []);
    const [newTag, setNewTag] = useState('');
    const [showAddTagInput, setShowAddTagInput] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenAudio = () => setAudio(true);
    const handleCloseAudio = () => setAudio(false);
    const [Audio, setAudio] = React.useState(false);

    const toggleAudioSetting = () => {
        setUserSettings(prevSettings => ({
            ...prevSettings,
            audio: !prevSettings.audio
        }));
    };

    useEffect(() => {
        const loadTags = () => {
            const levelKey = `TOCFL${level}`;
            const levelData = JSON.parse(localStorage.getItem(levelKey)) || [];
            const characterData = levelData.find(item => item.W === word);
            if (characterData && characterData.tags) {
                setTags(characterData.tags);
            }
        };
        loadTags();
    }, [word, level]);

    const handleWritingModeOn = () => setWritingMode(true);
    const handleWritingModeOff = () => setWritingMode(false);

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()];
            setTags(updatedTags);
            updateLocalStorage(updatedTags);
            setNewTag('');
            setShowAddTagInput(false); // Hide input field on successful add
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
        updateLocalStorage(updatedTags);
    };

    const updateLocalStorage = (updatedTags) => {
        const levelKey = `TOCFL${level}`;
        let levelData = JSON.parse(localStorage.getItem(levelKey)) || [];
        levelData = levelData.map(item => item.W === word ? {...item, tags: updatedTags} : item);
        localStorage.setItem(levelKey, JSON.stringify(levelData));
    };

    const playAudio = () => {
        if (userSettings.audio) {
            fetch(`https://pinyin-word-api.vercel.app/api/audio/${word}`)
                .then(response => response.blob())
                .then(blob => {
                    const audioUrl = URL.createObjectURL(blob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                })
                .catch(error => console.error('Error fetching audio:', error));
        }
    };

    const handleCancel = () => {
        setShowAddTagInput(false); // Hide the input box
        setNewTag(''); // Clear any input
    };
    

    return (
        <Box>
            <Card sx={{ minWidth: 360, minHeight: 360, p: 1 }}>
                <CardContent>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                    <ChineseCharacter character={word}/>
                    </Box>
                </Modal>
                <Modal
                    open={Audio}
                    onClose={handleCloseAudio}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleAudio} >
                        <FormGroup >
                        <FormControlLabel
                            control={<Checkbox checked={userSettings.audio} onChange={toggleAudioSetting} />}
                            label={<Typography sx={{color:"text.primary"}} variant="p">Turn on audio?</Typography>}
                        />
                        </FormGroup>
                    </Box>
                </Modal>
                    <Box display="flex" alignItems="end">
                            <Typography variant='h2' sx={{ display: "inline", fontFamily: "KaiTi" }}>{word}</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" ml={1} height={80} rowGap={.2}>
                            <IconButton onClick={handleOpen} sx={{width: 40}}><BrushOutlined /></IconButton>
                            {userSettings.audio ? <IconButton aria-label="play audio" onClick={playAudio} sx={{width: 40}}><VolumeUp /></IconButton> : <IconButton onClick={handleOpenAudio}  aria-label="audio muted" sx={{width: 40}}><VolumeOff /></IconButton>}
                            <Button onClick={() => setShowAddTagInput(true)} size="small">Add Tag</Button>
                        </Box>
                    </Box>
                    <Typography variant='h5' mb={1}>{pinyin}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h6' fontWeight={300} maxWidth={360}>{firstTranslation}</Typography>
                    <Box sx={{ mt: 1 }}>
                        {tags.map((tag, index) => (
                            <Chip sx={{margin: .4}} key={index} label={tag} onDelete={() => handleRemoveTag(tag)} />
                        ))}
                        {showAddTagInput && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                <TextField
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a new tag"
                                    size="small"
                                    variant="outlined"
                                    
                                />
                                <ButtonGroup variant="text">
                                    <Button onClick={handleAddTag} size="small">
                                        Save
                                    </Button>
                                    <Button onClick={handleCancel} size="small">
                                        Exit
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
