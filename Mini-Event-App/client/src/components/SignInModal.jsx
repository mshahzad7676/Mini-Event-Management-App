import * as React from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import api from '../services/api';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

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

export default function SignInModal({ open, handleClose }) {
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', formData);

      // Use login function from context to handle auth logic
      login(res.data.user, res.data.token);

      navigate('/dashboard');
      alert('Login successful');
      handleClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          autoComplete="off"
        >
          <TextField
            required
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
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
          <Button variant="contained" type="submit" color="primary">
            Sign In
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
