import React from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import theme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GlobalContext } from "./context/Context";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import "./App.css";
import api from "./api";

axios.defaults.withCredentials = true; // Important for sending cookies

function App() {
  const { state, dispatch } = React.useContext(GlobalContext);

  

  // Fetch user on initial load
  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/profile");
        dispatch({ type: "USER_LOGIN", user: res.data.user });
      } catch (err) {
        dispatch({ type: "USER_LOGOUT" }); 
      }
    };
    checkLogin();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" theme="dark" />
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
