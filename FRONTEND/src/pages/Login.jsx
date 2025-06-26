import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post('https://fully-func-ecom-postgress.vercel.app/login', values);
        toast.success(res.data.message);
        formik.resetForm();
      } catch (err) {
        toast.error(err.response?.data?.error || 'Server error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e1e2f' }}>
      <Typography variant="h5" color="#edbfc6" gutterBottom>Login</Typography>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, bgcolor: '#af8d86' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="#ccc">
          Don't have an account? <Link to="/signup" style={{ color: '#edbfc6' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Login;