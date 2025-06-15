import * as React from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import api from '../services/api'; // ✅ Make sure this path is correct

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function SignUpModal({ openSignUp, handleCloseSignUp }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/users/register', formData);
      console.log('User registered:', res.data);
      alert('Registration successful!');
      handleCloseSignUp(); // close modal
      setFormData({ name: '', email: '', password: '' }); // reset form
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={openSignUp}
      onClose={handleCloseSignUp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          autoComplete="off"
        >
          <TextField
            required
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          <Button variant="contained" type="submit" color="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
