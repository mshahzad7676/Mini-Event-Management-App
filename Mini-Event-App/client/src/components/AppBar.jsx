import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import Container from '@mui/material/Container';
 
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';



const pages = ['Home', 'Events', 'About Us'];


const ColorButton1 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));
const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);
    return (
    <AppBar position="static" className="bg-white shadow-sm ">
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between items-center">

          {/* Logo */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            className="text-black no-underline font-bold tracking-wider"
          >
            Mini Event Manager
          </Typography>

          {/* Nav Links */}
          <Box className="flex gap-8 text-black text-lg font-medium "  >
            {pages.map((page) => (
              <Typography variant="h6" key={page} component="div" className="cursor-pointer">{page}</Typography>
              
            ))}
          </Box>
        <Box className='flex gap-2'>
            <ColorButton2 variant="contained"onClick={handleOpen}>Sign In!</ColorButton2>
           <SignInModal open={open} handleClose={handleClose} />
            <ColorButton1 variant="contained"onClick={handleOpenSignUp}>Sign Up!</ColorButton1>
            <SignUpModal openSignUp={openSignUp} handleCloseSignUp={handleCloseSignUp} ></SignUpModal>
        </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
