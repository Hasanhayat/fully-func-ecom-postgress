// App.jsx'
import React from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GlobalContext } from "./context/Context";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const { state, dispatch } = React.useContext(GlobalContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" theme="dark" />
      <Container sx={{ py: 5 }}>
        {state.isLogin ? (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
