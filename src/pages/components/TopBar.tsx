// components/TopBar.tsx
import React from 'react';
import { AppBar, Button, Link, Stack, Toolbar, Typography } from '@mui/material';
import { useStore } from '@/utils/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const TopBar: React.FC = () => {
  const setAccessToken = useStore((state: any) => state.setAccessToken)
  const router = useRouter();
  const accessToken = useStore((state: any) => state.accessToken)

  const logout = () => {
    setAccessToken(null)
    toast.success("Logged out")
    router.push('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Magazines
        </Typography>
        <Stack spacing={2} ml={4} direction="row" >
          <Link href="subscriptions">
            <Button variant="contained">Subscriptions</Button>
          </Link>
          <Link href="magazines">
            <Button variant="contained">Magazines</Button>
          </Link>
        </Stack>
        <Stack spacing={2} ml={10} direction="row" >
          {
            accessToken ?
              <Button variant="contained" onClick={() => logout()}>Logout</Button>
              :
              <>
                <Link href="login" align='right'>
                  <Button variant="contained">Login</Button>
                </Link>
                <Link href="signup" align='right'>
                  <Button variant="contained">Signup</Button>
                </Link>
              </>
          }
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
