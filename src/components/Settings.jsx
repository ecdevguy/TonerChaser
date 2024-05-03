import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

export default function Settings() {
    const { userSettings, setUserSettings } = useContext(SettingsContext);

    const toggleAudioSetting = () => {
        setUserSettings(prevSettings => ({
            ...prevSettings,
            audio: !prevSettings.audio
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
                <FormLabel component="legend" sx={{marginBottom: 1}}>
                    <Typography variant='h5'>Settings</Typography>
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Dark Mode"
                        sx={{marginBottom: 4}}
                    />
                
                <FormLabel component="legend" sx={{marginBottom: 1}}>
                    <Typography variant='h5'>Experimental</Typography>
                </FormLabel>
                <FormControlLabel
                        control={<Checkbox checked={userSettings.audio}
                        onChange={toggleAudioSetting}/>}
                        label="Audio Playback"
                    />
                </FormGroup>
            </FormControl>
            </Grid>
        </Grid>
    );
}