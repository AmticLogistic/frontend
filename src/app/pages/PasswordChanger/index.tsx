import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper/Paper';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';



const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
          . <Card variant="outlined">
            <CardHeader
                avatar={
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                   <PasswordIcon />
                  </Avatar>
                }
                
                title={ <Typography component="h1" variant="h5">Cambiar contraseña</Typography>}
                >
            </CardHeader>
            <CardContent>
              <Box    sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                  <Grid item xs={12} >
                    <TextField
                      autoComplete="given-name"
                      name="codecontri"
                      required
                      fullWidth
                      id="codecontri"
                      label="Código contribuyente"
                      autoFocus
                      inputProps={{ maxLength: 50 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirmar Password"
                      id="confirmpassword"
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Confirmar
                </Button>

              </Box>
            </CardContent>
          </Card>
        </Box>

      </Container>
    </ThemeProvider>
  );
}