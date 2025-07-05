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
import { Loader2 } from "lucide-react";
import Admin from "./admin/Admin";
import Shop from "./pages/Shop";

axios.defaults.withCredentials = true; // Important for sending cookies

function App() {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch user on initial load
  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/profile");
        dispatch({ type: "USER_LOGIN", user: res.data.user });
        setIsLoading(false);
      } catch (err) {
        dispatch({ type: "USER_LOGOUT" });
        setIsLoading(false);
      }
    };
    checkLogin();
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#260c1a]">
        <Loader2 className="animate-spin text-white" size={48} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" theme="dark" />
      <Container sx={{ py: 5 }}>
        {state.user.role == 1 && state.isLogin ? (
          <>
            <Nav />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </>
        ) : state.isLogin ? (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
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
