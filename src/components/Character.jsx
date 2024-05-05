import React, { useContext, useState } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Card, CardContent, Container, Divider, IconButton, Typography } from '@mui/material';
import { Draw, EditOff, Hearing, VolumeUp } from '@mui/icons-material';
import ChineseCharacter from './ChineseCharacter';

export default function Character({ word, pinyin, OtherPinyin, level, firstTranslation, listItem }) {
    const { userSettings } = useContext(SettingsContext);
    const [writingMode, setWritingMode] = useState(false);
    const handleWritingModeOn = () => setWritingMode(true);
    const handleWritingModeOff = () => setWritingMode(false);
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
        <Box >
            <Card sx={{ width:{xs: 360, sm: 370}, height:{xs: 330, sm: 310}, p: 1 }}>
                <CardContent>
                    
                    <Box display="flex" alignItems="end" height={80}>
                    {writingMode ? <ChineseCharacter character={word || ''} /> :
                    <Typography variant='h2' sx={{display:"inline", fontFamily: "KaiTi", margin: "0px", padding: "0px"}}>{word}</Typography>}
                        <Box display="flex" flexDirection="column" marginLeft={2}>
                        {writingMode ? <IconButton onClick={handleWritingModeOff}><EditOff /></IconButton> : <IconButton onClick={handleWritingModeOn}><Draw /></IconButton>}
                        {userSettings.audio && <IconButton aria-label="play audio" onClick={playAudio}><VolumeUp/></IconButton>}
                        </Box>
                    </Box>
                    <Typography variant='h5' sx={{marginBottom: 1}}>{pinyin}</Typography>
                    <Divider sx={{marginBottom: 2}}/>
                    {/* <Typography>{OtherPinyin}</Typography> */}
                    {/* <Typography>{level}</Typography> */}
                    <Typography variant='h6' fontWeight={300}>{firstTranslation}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
