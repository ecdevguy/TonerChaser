import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
      position: 'fixed',
      bottom: 0,
      width: '100%'
      }} 
      component="footer" 
      square variant="outlined"><Container maxWidth="lg">
      {/* <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          my:1
        }}
      >
        <Typography variant='p'>tocfl learning resource</Typography>
      </Box> */}

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          m: 1,
        }}
      >
        <Typography variant="caption" color={"text.primary"}>
          last updated: May, 2024
        </Typography>
      </Box>
    </Container></Paper>
  )
}

