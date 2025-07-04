import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { GlobalContext } from '../context/Context';
import api from '../api';

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const { state, dispatch } = useContext(GlobalContext);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await api.post('/login', values);
        toast.success(res.data.message);
        dispatch({ type: 'USER_LOGIN', user: res.data.user });
        formik.resetForm();
      } catch (err) {
        toast.error(err.response?.data?.error || 'Server error');
        dispatch({ type: 'USER_LOGOUT' });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box className="min-h-screen flex items-center justify-center bg-[#260c1a] px-4">
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, bgcolor: '#432e36', width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom align="center" color="#edbfc6" fontWeight={600}>
          Welcome Back
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              bgcolor: '#af8d86',
              color: '#260c1a',
              fontWeight: 600,
              '&:hover': { bgcolor: '#edbfc6' },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#260c1a' }} /> : 'Login'}
          </Button>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="#ccc">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#edbfc6', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
