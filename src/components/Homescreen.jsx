import React from 'react';
import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Homescreen({mode}) {
  return (
    <Box sx={{ padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '20px',
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#171717',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h3" gutterBottom>
            Learn Traditional Chinese Characters
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            A simple app to practice TOCFL levels 1 through 7
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/study"
            sx={{ marginRight: '10px' }}
          >
            Start Studying
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/search"
          >
            Search Characters
          </Button>
        </Box>
        <Grid container spacing={4}>
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
