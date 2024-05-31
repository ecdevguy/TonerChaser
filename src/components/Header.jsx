import React, { useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AppBar, Autocomplete, Avatar, Box, Button, Divider, IconButton, InputBase, Link, Menu, MenuItem, Modal, TextField, Toolbar, Typography, styled } from '@mui/material'
import { DarkMode, DarkModeOutlined, HomeRounded, LightMode, MenuRounded, SettingsRounded } from '@mui/icons-material'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between",
  color:"white",
  minWidth: "320px",
  margin: "0"
})

const Search = styled(Autocomplete)(({theme})=>({
  backgroundColor:"white",
  borderRadius: theme.shape.borderRadius,
  width:"30%",
}))

const Features = styled(Box)(({theme})=>({
  display:"none",
  gap:"30px",
  alignItems:"center",

  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
}))

const UserBox = styled(Box)(({theme})=>({
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
}))

const MenuFeatures = styled(Box)(({theme})=>({
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
}))


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Header({ mode, setMode }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const handleResize = () => {
      setAnchorEl(null);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/signin")
    handleClose();
  };
  return (
    <AppBar position="sticky" sx={{marginBottom:"30px"}}>
      <StyledToolbar> 
        <Link 
        component={RouterLink} underline="none" className="site-logo" to="/" color="inherit">
          <Typography variant='h6' sx={{display:{xs:"none", sm:"block"}}}>
            TONECHASER
          </Typography>
          <Typography variant='h6' sx={{display:{xs:"block", sm:"none"}}}>
            ToneChaser
          </Typography>
          
        </Link>
        <Features>
        
          <Link component={RouterLink} underline="none" to="/" color="inherit">
            <Typography>Study</Typography>
          </Link>
          {/* <Link component={RouterLink} underline="none" to="challenge" color="inherit" >
            <Typography>Challenge</Typography>
          </Link> */}
          
          <Link component={RouterLink} underline="none" to="search" color="inherit">
            <Typography>Search</Typography>
          </Link>
          <Box sx={{display: "flex", gap: "10px"}}>
          {!user && 
            <Button color="inherit" variant="outlined">
              <Link component={RouterLink} underline="none" to="signin" color="inherit">
                Log In
              </Link>
            </Button>}
          {!user && 
            <Button color="inherit" variant="contained">
              <Link component={RouterLink} underline="none" to="signup" >
              Sign Up
              </Link>
            </Button>}
            </Box>
        </Features>
      <Box>
        {
          mode === "dark" ?
          <IconButton onClick={e => setMode(mode === "light" ? "dark" : "light")}>
            <LightMode />
          </IconButton> :
          <IconButton onClick={e => setMode(mode === "dark" ? "light" : "dark")}>
            <DarkModeOutlined sx={{ color:"white" }} />
          </IconButton>
        }
        <Button
          id="basic-button"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {user ? <Avatar /> : <MenuRounded />}
        </Button>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} 
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}
        >
          <MenuFeatures>
          <MenuItem>
            <Link component={RouterLink} underline="none" to="/" color="inherit" onClick={handleClose}>
              <Typography>
                Study
              </Typography>
            </Link>
          </MenuItem>
          {/* <MenuItem >
            <Link component={RouterLink} underline="none" to="challenge" color="inherit">
              <Typography>
                Challenge
              </Typography>
            </Link>
          </MenuItem> */}
          <MenuItem >
            <Link component={RouterLink} underline="none" to="search" color="inherit" onClick={handleClose}>
              <Typography>
                Search
              </Typography>
            </Link>
          </MenuItem>
          </MenuFeatures>
          <MenuItem>
            <Link component={RouterLink} underline="none" to="settings" color="inherit" onClick={handleClose}>
              <Typography>
                Settings
              </Typography>
            </Link>
          </MenuItem>
          {user ? <MenuItem onClick={handleLogOut}>
              <Typography>
                Log Out
              </Typography>
          </MenuItem> : <MenuItem>
            <Link component={RouterLink} underline="none" to="/signin" color="inherit" onClick={handleClose}>
              <Typography>
                Sign In
              </Typography>
            </Link>
          </MenuItem>}
        </Menu>
      </Box>
      </StyledToolbar>
    </AppBar>
    
  )
}

export default Header