import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';

import { signInWithGoogle, signOut, useUserState } from '../firebase';

const NavBar = ({ order, setOrder }) => {
  const [user] = useUserState();

  const handleChange = () => {
    if (order === 'release') {
      setOrder('chrono');
    } else {
      setOrder('release');
    }
  };

  return (
    <AppBar position='static' color='primary'>
      <Toolbar variant='dense'>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch onChange={handleChange} aria-label='login switch' />
            }
            label={order === 'release' ? 'Release Date' : 'Chronological'}
          />
        </FormGroup>

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
