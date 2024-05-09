import React, { useContext, useState, useEffect } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography, Chip, ButtonGroup, Container } from '@mui/material';
import { Draw, EditOff, VolumeUp, Close } from '@mui/icons-material';
import ChineseCharacter from './ChineseCharacter';

export default function Character({ word, pinyin, otherPinyin, level, firstTranslation, initialTags }) {
    const { userSettings } = useContext(SettingsContext);
    const [writingMode, setWritingMode] = useState(false);
    const [tags, setTags] = useState(initialTags || []);
    const [newTag, setNewTag] = useState('');
    const [showAddTagInput, setShowAddTagInput] = useState(false);

    useEffect(() => {
        const loadTags = () => {
            const levelKey = `tocfl${level}`;
            const levelData = JSON.parse(localStorage.getItem(levelKey)) || [];
            const characterData = levelData.find(item => item.Word === word);
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
        const levelKey = `tocfl${level}`;
        let levelData = JSON.parse(localStorage.getItem(levelKey)) || [];
        levelData = levelData.map(item => item.Word === word ? {...item, tags: updatedTags} : item);
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
            <Card sx={{ width: 360, height: 380, p: 1 }}>
                <CardContent>
                    <Box display="flex" alignItems="end">
                        {writingMode ? <ChineseCharacter character={word} /> :
                            <Typography variant='h2' sx={{ display: "inline", fontFamily: "KaiTi" }}>{word}</Typography>}
                        <Box display="flex" flexDirection="column" ml={1} height={80}>
                            {writingMode ? <IconButton onClick={handleWritingModeOff}><EditOff /></IconButton> :
                                <IconButton onClick={handleWritingModeOn}><Draw /></IconButton>}
                            {userSettings.audio && <IconButton aria-label="play audio" onClick={playAudio}><VolumeUp /></IconButton>}
                            <Button onClick={() => setShowAddTagInput(true)} size="small">Add Tag</Button>
                        </Box>
                    </Box>
                    <Typography variant='h5' mb={1}>{pinyin}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h6' fontWeight={300}>{firstTranslation}</Typography>
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
