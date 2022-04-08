import React, { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//List componentes
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

//notifications
import { useSnackbar } from "notistack";

// coquie elements
import Button from "components/CustomButtons/Button.js";
import Cookies from "universal-cookie";

//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

const theme = createTheme();

export default function SignInSide() {
  const { enqueueSnackbar } = useSnackbar();
  const [resultado, setResultado] = useState([]);
  const handleListItemClick = (event, row) => {
    //setSelectedIndex(index);
    console.log(row.idOlimpiada);
    cookies.set("olimpiada", row.idOlimpiada, { path: "/" });
    cookies.set("nombreolimpiada", row.nombre, { path: "/" });
    window.location.href = "./";
  };

  const handleSignOut = () => {
    console.log("salir");
    cookies.remove("token", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("olimpiada", { path: "/" });
    cookies.remove("nombreolimpiada", { path: "/" });
    window.location.href = "/";
  };
  //---    getAll    --//
  const getAll = useCallback(async () => {
    await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response);
        setResultado(response?.data?.olimpiadas);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setResultado, enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAll();
  }, [getAll]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://aceleratucarrera.com/wp-content/uploads/2018/03/trabajo-en-equipo.png)",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Bienvenido
            </Typography>

            <Typography>Gracias por formar parte del Team OBI.</Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Versiones de la Olimpiada
                </ListSubheader>
              }
            >
              {resultado.map((row) =>
                row.visible ? (
                  <ListItemButton
                    key={row.idOlimpiada}
                    value={row.idOlimpiada}
                    onClick={(event) => handleListItemClick(event, row)}
                  >
                    <ListItemIcon>
                      <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary={row.nombre} />
                  </ListItemButton>
                ) : (
                  ""
                )
              )}
            </List>

            <Button color="danger" onClick={() => handleSignOut()} round>
              Cerrar Session
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
