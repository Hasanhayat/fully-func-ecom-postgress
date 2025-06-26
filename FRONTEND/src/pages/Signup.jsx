import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post('https://fully-func-ecom-postgress.vercel.app/sign-up', values);
        toast.success(res.data.message);
        navigate('/login');
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
      <Typography variant="h5" color="#edbfc6" gutterBottom>Sign Up</Typography>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          {...formik.getFieldProps('firstName')}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          {...formik.getFieldProps('lastName')}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
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
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign Up'}
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="#ccc">
          Already have an account? <Link to="/login" style={{ color: '#edbfc6' }}>Login</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Signup;
