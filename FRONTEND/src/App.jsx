// App.jsx
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
