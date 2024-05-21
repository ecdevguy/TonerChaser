import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Autocomplete, Box, Button, IconButton, InputBase, Link, Menu, MenuItem, Modal, TextField, Toolbar, Typography, styled } from '@mui/material'
import { DarkMode, DarkModeOutlined, HomeRounded, LightMode, MenuRounded, SettingsRounded } from '@mui/icons-material'

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
  gap:"20px",
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
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');


  // function cleanData(item) {
  //   return {
  //     ...item,
  //     "First Translation": typeof item["First Translation"] === 'string' ? item["First Translation"] : ''
  //   };
  // }
  
  // // const unfilteredList = [
  // //   ...JSON.parse(localStorage.getItem("TOCFL1")).map(cleanData), 
  // //   ...JSON.parse(localStorage.getItem("TOCFL2")).map(cleanData),
  // //   ...JSON.parse(localStorage.getItem("TOCFL3")).map(cleanData),
  // //   ...JSON.parse(localStorage.getItem("TOCFL4")).map(cleanData),
  // //   ...JSON.parse(localStorage.getItem("TOCFL5")).map(cleanData),
  // //   ...JSON.parse(localStorage.getItem("TOCFL6")).map(cleanData),
  // //   ...JSON.parse(localStorage.getItem("TOCFL7")).map(cleanData)
  // // ];

  // const options = unfilteredList.map((option) => {
  //   const characterLevel = option.Level;
  
  //   let levelDescription;
  //   if (/[1-7]/.test(characterLevel)) {
  //     levelDescription = `Level ${characterLevel}`;
  //   } else {
  //     levelDescription = characterLevel;
  //   }
  
  //   return {
  //     characterLevel: levelDescription,
  //     ...option,
  //   };
  // });
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" sx={{marginBottom:"30px"}}>
      <StyledToolbar> 
        <Link 
        component={RouterLink} underline="none" className="site-logo" to="/" color="inherit">
          <Typography variant='h6' sx={{display:{xs:"none", sm:"block"}}}>
            TONECHASER
          </Typography>
          <HomeRounded sx={{display:{xs:"block", sm:"none"}}}/>
        </Link>
        {/* <Search
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="grouped-demo"
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={options.sort((a, b) => -b.characterLevel.localeCompare(a.characterLevel))}
          groupBy={(option) => option.characterLevel}
          getOptionLabel={(option) => option.Word}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} placeholder="Search..." />}
        /> */}
        <Features>
        {
          mode === "dark" ?
          <IconButton>
            <LightMode onClick={e => setMode(mode === "light" ? "dark" : "light")}/>
          </IconButton> :
          <IconButton>
            <DarkModeOutlined sx={{ color:"white" }} onClick={e => setMode(mode === "dark" ? "light" : "dark")}/>
          </IconButton>

        }
          <Link component={RouterLink} underline="none" to="study" color="inherit">
            <Typography>Study</Typography>
          </Link>
          {/* <Link component={RouterLink} underline="none" to="challenge" color="inherit" >
            <Typography>Challenge</Typography>
          </Link> */}
          <Link component={RouterLink} underline="none" to="list" color="inherit">
            <Typography>List</Typography>
          </Link>
          <Link component={RouterLink} underline="none" to="settings" color="inherit">
            Settings
          </Link>
        </Features>
      <UserBox>
        {
          mode === "dark" ?
          <IconButton>
            <LightMode onClick={e => setMode(mode === "light" ? "dark" : "light")}/>
          </IconButton> :
          <IconButton>
            <DarkModeOutlined sx={{ color:"white" }} onClick={e => setMode(mode === "dark" ? "light" : "dark")}/>
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
          <MenuRounded />
        </Button>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} 
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem >
            <Link component={RouterLink} underline="none" to="study" color="inherit">
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
            <Link component={RouterLink} underline="none" to="list" color="inherit">
              <Typography>
                List
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem >
            <Link component={RouterLink} underline="none" to="settings" color="inherit">
              <Typography>
                Settings
              </Typography>
            </Link>
          </MenuItem>
        </Menu>
      </UserBox>
      </StyledToolbar>
    </AppBar>
    
  )
}

export default Header