import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Box, Link, Toolbar, Typography, styled } from '@mui/material'
import { HomeRounded } from '@mui/icons-material'

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between",
  color:"white"
})

const Search = styled("div")(({theme})=>({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius: theme.shape.borderRadius,
  width:"20%"
}))

const Features = styled(Box)(({theme})=>({
  
}))


function Header() {

  return (
    <AppBar position="sticky">
      <StyledToolbar> 
        <Link 
        component={RouterLink} underline="none" className="site-logo" to="/" color="inherit">
          <Typography variant='h6' sx={{display:{xs:"none", sm:"block"}}}>
            TONECHASER
          </Typography>
          <HomeRounded sx={{display:{xs:"block", sm:"none"}}}/>
        </Link>
        <Search>Search</Search>
        <Features>
          <Link component={RouterLink} underline="hover" to="study" color="inherit">
            <Typography>Study</Typography>
          </Link>
          <Link component={RouterLink} underline="hover" to="challenge" color="inherit">
            <Typography>Challenge</Typography>
          </Link>
          <Link component={RouterLink} underline="hover" to="list" color="inherit">
            <Typography>List</Typography>
          </Link>
          <Link component={RouterLink} underline="hover" to="settings" color="inherit">
            <Typography>Settings</Typography>
          </Link>
        </Features>
      </StyledToolbar>
    </AppBar>
  )
}

export default Header

{/* <Link component={RouterLink} underline="none" className="site-logo" to="/">ToneChaser</Link>
<Link component={RouterLink} underline="hover" to="study">study</Link>
<Link component={RouterLink} underline="hover" to="challenge">challenge</Link>
<Link component={RouterLink} underline="hover" to="list">list</Link>
<Link component={RouterLink} underline="hover" to="settings">settings</Link> */}