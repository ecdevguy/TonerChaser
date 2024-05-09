import React, { useContext, useState, useEffect } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography, Chip } from '@mui/material';
import { Draw, EditOff, VolumeUp } from '@mui/icons-material';
import ChineseCharacter from './ChineseCharacter';

export default function Character({ word, pinyin, otherPinyin, level, firstTranslation, initialTags }) {
    const { userSettings } = useContext(SettingsContext);
    const [writingMode, setWritingMode] = useState(false);
    const [tags, setTags] = useState(initialTags || []);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        // Load tags from localStorage on component mount and when word changes
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

    return (
        <Box>
            <Card sx={{ width: 360, height: 330, p: 1 }}>
                <CardContent>
                    <Box display="flex" alignItems="end" height={80}>
                        {writingMode ? <ChineseCharacter character={word} /> :
                            <Typography variant='h2' sx={{ display: "inline", fontFamily: "KaiTi" }}>{word}</Typography>}
                        <Box display="flex" flexDirection="column" ml={2}>
                            {writingMode ? <IconButton onClick={handleWritingModeOff}><EditOff /></IconButton> :
                                <IconButton onClick={handleWritingModeOn}><Draw /></IconButton>}
                            {userSettings.audio && <IconButton aria-label="play audio" onClick={playAudio}><VolumeUp /></IconButton>}
                        </Box>
                    </Box>
                    <Typography variant='h5' mb={1}>{pinyin}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h6' fontWeight={300}>{firstTranslation}</Typography>
                    <Box sx={{ mt: 2 }}>
                        {tags.map((tag, index) => (
                            <Chip key={index} label={tag} onDelete={() => handleRemoveTag(tag)} />
                        ))}
                        <TextField
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a new tag"
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 1 }}
                        />
                        <Button onClick={handleAddTag} size="small" sx={{ mt: 1 }}>Add Tag</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
