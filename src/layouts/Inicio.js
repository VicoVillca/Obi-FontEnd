import React, { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
//List componentes
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//notifications
import { useSnackbar } from "notistack";

// coquie elements
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import avatar from "assets/img/imgloginedit.png";
import avatar2 from "assets/img/OBI_small.jpg";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import UpdatePerfil from "views/Usuario/UpdatePerfil";
import UpdatePasword from "views/Usuario/UpdatePasword";

const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

const theme = createTheme();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[300],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default function SignInSide() {
  const { enqueueSnackbar } = useSnackbar();
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalPasword, setOpenPasword] = useState(false);
  const [resultado, setResultado] = useState([]);
  const handleListItemClick = (event, row) => {
    //setSelectedIndex(index);
    console.log(row.idOlimpiada);
    cookies.set("olimpiada", row.idOlimpiada, { path: "/" });
    cookies.set("nombreolimpiada", row.nombre, { path: "/" });
    window.location.href = "./";
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalPasword = () => {
    setOpenPasword(!openModalPasword);
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
    enqueueSnackbar(
      "Bienvenido " + cookies.get("username") + " al Panel de usuario !",
      {
        variant: "success",
      }
    );
    getAll();
  }, [getAll, enqueueSnackbar]);

  return (
    <>
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
              p: 20,
            }}
          >
            <Card
              profile
              sx={{
                alignItems: "center",

                m: 5,
                border: "1px dashed grey",
              }}
            >
              <CardBody profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar2} alt="..." />
                </a>
                <Typography variant="h3" gutterBottom component="div">
                  Bienvenido
                </Typography>

                <Typography
                  variant="h7"
                  gutterBottom
                  component="div"
                  sx={{
                    pr: 10,
                    pl: 10,
                  }}
                >
                  Nuestro objetivo principal es coordinar y apoyar a los
                  estudiantes en los diferentes niveles y etapas de la olimpiada
                  con rumbo a la IOI y tener dignos representantes nacionales.
                </Typography>
              </CardBody>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
              <Typography>Gracias por formar parte del Team OBI.</Typography>
              <br />
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  startIcon={<ManageAccountsIcon />}
                  onClick={() => handleModalUpdate()}
                >
                  Perfil
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FingerprintIcon />}
                  onClick={() => handleModalPasword()}
                >
                  Cambiar Contraseña
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleSignOut()}
                  startIcon={<LogoutIcon />}
                >
                  Salir
                </Button>
              </Stack>
              <br />

              <List
                sx={{
                  width: "100%",
                  maxWidth: 560,
                  bgcolor: "background.paper",
                  border: "1px dashed grey",
                }}
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
              <br />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/*MODAL UPDATE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalUpdate}
        aria-labelledby="customized-dialog-title"
        open={openModalUpdate}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalUpdate}
        >
          Editar Perfil
        </BootstrapDialogTitle>

        <DialogContent>
          <UpdatePerfil func={handleModalUpdate} />
        </DialogContent>
      </BootstrapDialog>
      {/*MODAL Pasword New*/}

      <BootstrapDialog
        onClose={handleModalPasword}
        aria-labelledby="customized-dialog-title"
        open={openModalPasword}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalPasword}
        >
          Cambiar la Contraseña
        </BootstrapDialogTitle>

        <DialogContent>
          <UpdatePasword func={handleModalPasword} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
