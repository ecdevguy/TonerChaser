import React from 'react';
import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Homescreen({mode}) {
  return (
    <Box sx={{ padding: '20px 0', height: '100%' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '20px',
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#171717',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Learn Traditional Chinese Characters
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            A simple app to practice TOCFL levels 1 through 7
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
          <Button
            variant="contained"
            color="primary"
            size='large'
            component={RouterLink}
            to="/study"
          >
            Study
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size='large'
            component={RouterLink}
            to="/search"
          >
            Search
          </Button>
          </Box>
        </Paper>
        <Grid container spacing={4} sx={{
          marginBottom: 8
        }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', borderRadius: '12px' }}>
              <Typography variant="h5" gutterBottom>
                Study Mode
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Practice writing and pronunciation.
              </Typography>
              <Button variant="contained" color="secondary" component={RouterLink} to="/study">
                Start Studying
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', borderRadius: '12px' }}>
              <Typography variant="h5" gutterBottom>
                Search Characters
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Easily search for characters by meaning, pinyin, or tag.
              </Typography>
              <Button variant="outlined" color="secondary" component={RouterLink} to="/search">
                Search Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Homescreen;
