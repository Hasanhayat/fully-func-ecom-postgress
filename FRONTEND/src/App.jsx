// App.jsx'
import React from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" theme="dark" />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
