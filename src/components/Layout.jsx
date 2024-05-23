import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout({ mode, setMode}) {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"} minHeight={"100vh"} >
      <Header mode={mode} setMode={setMode}/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  )
}