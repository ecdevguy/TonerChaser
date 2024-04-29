import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Link, Toolbar, styled } from '@mui/material'

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between",
  color:"blue"
})


function Header() {

  return (
    <AppBar position="stick">
      <StyledToolbar>
        this works
        <Link component={RouterLink} underline="none" className="site-logo" to="/" color="inherit">This does work</Link>
        <Link component={RouterLink} underline="hover" to="study">study</Link>
        <Link component={RouterLink} underline="hover" to="challenge">challenge</Link>
        <Link component={RouterLink} underline="hover" to="list">list</Link>
        <Link component={RouterLink} underline="hover" to="settings">settings</Link>
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