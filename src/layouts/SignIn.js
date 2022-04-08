import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";

import { experimentalStyled as styled } from "@mui/material/styles";
import avatar1 from "assets/img/OBI_small.jpg";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
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
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Hidden mdUp>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} sx={{ border: "1px  grey" }}>
            <Item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pr: 3,
                  pl: 3,
                }}
              >
                <img src={avatar1} alt="logo1" />

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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Iniciar
                  </Button>
                </form>
              </Box>
            </Item>
            <Item>
              <Link href="#" variant="body2">
                ¿Se te olvidó tu contraseña?
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdDown>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              p: 1,
            }}
          >
            <br />
            <br />
            <br />
            <Img
              alt="complex"
              src="https://www.opinion.com.bo/asset/thumbnail,992,558,center,center//media/opinion/images/2013/08/23/2013N103891.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ border: "1px  grey" }}>
            <Item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pr: 3,
                  pl: 3,
                }}
              >
                <img src={avatar1} alt="logo1" />

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

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Iniciar
                  </Button>
                </form>
              </Box>
            </Item>
            <Item>
              <Link href="#" variant="body2">
                ¿Se te olvidó tu contraseña?
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Hidden>

      <Copyright sx={{ mt: 3, mb: 4 }} />
    </div>
  );
}
