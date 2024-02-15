import { useEffect, useState } from 'react';
import { Container, TextField, Button, ThemeProvider, CssBaseline, Box, Avatar, Typography, FormControlLabel, Checkbox, Grid, Link, createTheme } from '@mui/material';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { signup } from '@/apis/auth';
import { useStore } from '@/utils/store';
import { useRouter } from 'next/router';
interface Form {
  name: string,
  email: string,
  password: string
}

const SignupPage = () => {
  const defaultTheme = createTheme();
  const [form, setForm] = useState<Form>({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<string[]>([])
  const setAccessToken = useStore((state: any) => state.setAccessToken)
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length) {
      errors.map((error) => { toast.error(error) })
      return
    }
    signupMutation(form)
  };
  const { mutate: signupMutation } = useMutation('signup', signup, {
    onSuccess: (response) => {
      if (response) {
        setAccessToken(response.data?.access_token)
        toast.success("Welcome")
        router.push('/magazines');
      }
    },
    onError: (response) => {
      console.log(response)
    }
  })


  useEffect(() => {
    let errors = []
    if (!form.email)
      errors.push("Email is empty")
    if (!form.name)
      errors.push("Full name is empty")
    if (!form.password)
      errors.push("Password is empty")
    setErrors(errors)
  }, [form])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage
