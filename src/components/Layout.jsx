import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  )
}