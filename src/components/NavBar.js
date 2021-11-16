import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { signInWithGoogle, signOut, useUserState } from '../firebase';

const NavBar = () => {
  const [user] = useUserState();

  return (
    <AppBar position='static' color='primary'>
      <Toolbar variant='dense'>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          MarvelChronologyUnboxed
        </Typography>
        {user ? (
          <Button color='inherit' onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button color='inherit' onClick={signInWithGoogle}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
