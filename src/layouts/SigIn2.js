import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//notifications
import { useSnackbar } from "notistack";

//aspwrd input
import { InputAdornment } from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

//utiles para el webservise
import axios from "axios";
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
const baseUrl = HOST.URL_BACK_END + "auth/login";
const cookies = new Cookies();
const header = HOST.headerPublic();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        OBI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();

  const [passwordIsMasked, setpasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setpasswordIsMasked(!passwordIsMasked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(
        baseUrl,
        JSON.stringify({
          username: data.get("username"),
          password: data.get("password"), //"juassdn"
        }),
        header
      );

      cookies.set("token", response?.data?.token, { path: "/" });
      cookies.set("rol", response?.data?.rol, { path: "/" });
      cookies.set("username", data.get("username"));
      window.location.href = "./";
    } catch (err) {
      enqueueSnackbar("Nombre de usuario o contraseña incorrectos!", {
        variant: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
            />

            <TextField
              variant="outlined"
              margin="normal"
              type={passwordIsMasked ? "password" : "text"}
              fullWidth
              required
              name="password"
              label="password"
              id="pasword"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEyeIcon onClick={togglePasswordMask} />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Iniciar
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Se te olvidó tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"¿No tienes una cuenta? Inscribete"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 1, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
