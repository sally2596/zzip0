// @ts-nocheck

import * as React from 'react';

import Link from 'next/link';
import Login from '../pages/signin';
import styled from '@emotion/styled';
import router from "next/router";

// mui
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { border } from '@mui/system';
import { NoEncryption } from '@mui/icons-material';

// cookie
import { Cookies, useCookies } from 'react-cookie';

{
}

// modal style
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderColor: 'transparent'
};

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cookies = new Cookies();
  const [, setCookie, removeCookie] = useCookies(['accessToken']);

  const handleLogout = () => {
    if (cookies.get('accessToken')){
      removeCookie('accessToken');
      router.push("/")
      alert('로그아웃 되었습니다');
    }
    else{
      alert('이미 로그아웃 되었습니다');
    }

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="navbar">
        <Toolbar>
          <Link href={`/`}>
            <Button variant="text" color="inherit" sx={{ mr: 1, width: '300px' }} size="large">
              <b>ZZip_0</b>
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href={`/`}>
              <Button variant="text" color="inherit" sx={{ mr: 1, width: '80px' }}>
                Home
              </Button>
            </Link>
            <button onClick={handleLogout}></button>

            <Link href={`/roomlist`}>
              <Button variant="text" color="inherit" sx={{ mr: 1, width: '80px' }}>
                Study
              </Button>
            </Link>

            <Link href={`/payment`}>
              <Button variant="text" color="inherit" disabled sx={{ mr: 1, width: '80px' }}>
                Price
              </Button>
            </Link>

            <Link href={`/report`}>
              <Button variant="text" color="inherit" sx={{ mr: 1, width: '80px' }}>
                Report
              </Button>
            </Link>
            
            {cookies.get('accessToken')? (
              <Button onClick={handleLogout} color="inherit" sx={{ mr: 1, width: '80px' }}>
                LogOut
              </Button>
            ) : (
              <Button onClick={handleOpen} color="inherit" sx={{ mr: 1, width: '80px' }}>
                SignIn
              </Button>
            )}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Login />
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const NavbarContainer = styled.div``;
export default Navbar;
