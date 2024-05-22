import React, { useContext, useState } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Typography } from '@mui/material';
import { HexColorPicker } from "react-colorful";

export default function Settings() {
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    const [color, setColor] = useState(userSettings.color || "#aabbcc");

    const toggleAudioSetting = () => {
        setUserSettings(prevSettings => ({
            ...prevSettings,
            audio: !prevSettings.audio
        }));
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setUserSettings(prevSettings => ({
            ...prevSettings,
            color: newColor
        }));
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '50vh' }}
        >
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                        <Typography variant='h5'>Experimental</Typography>
                    </FormLabel>
                    <FormControlLabel
                        control={<Checkbox checked={userSettings.audio} onChange={toggleAudioSetting} />}
                        label="Audio Playback (inaccurate)"
                    />
                    <FormLabel component="legend" sx={{ marginBottom: 2, marginTop: 5 }}>
                        <Typography variant='h5' style={{ color: color }}>Stroke Color Picker</Typography>
                    </FormLabel>
                    <FormGroup>
                        <HexColorPicker color={color} onChange={handleColorChange} />
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
}
