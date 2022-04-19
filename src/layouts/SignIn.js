import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
import { withRouter } from "react-router-dom";

import { experimentalStyled as styled } from "@mui/material/styles";
import avatar1 from "assets/img/OBI_small.jpg";
//notifications
import { useSnackbar } from "notistack";
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";

//FORMULARIOS
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

//aspwrd input
import { InputAdornment } from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SendIcon from "@mui/icons-material/Send";

//utiles para el webservise
import axios from "axios";
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
const baseUrl = HOST.URL_BACK_END + "auth/login";
const baseUrlContraseña = HOST.URL_BACK_END + "auth/recuperar";
const cookies = new Cookies();
const header = HOST.headerPublic();
//Modal elements
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

export default withRouter(function SignIn(props) {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [openModalContraseña, setOpenContraseña] = useState(false);
  const [passwordIsMasked, setpasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setpasswordIsMasked(!passwordIsMasked);
  };
  const handleModalContraseña = () => {
    setOpenContraseña(!openModalContraseña);
  };
  const handleSubmit = async (event) => {
    enqueueSnackbar("Procesando solicitud espere un momento...!", {
      variant: "info",
    });
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
      //history.push("./ini");
      history.go(0);
    } catch (err) {
      enqueueSnackbar("Nombre de usuario o contraseña incorrectos!", {
        variant: "error",
      });
    }
  };
  //---    New Contraseña --//

  const Contraseña = async (event) => {
    enqueueSnackbar("Procesando solicitud espere un momento...!", {
      variant: "info",
    });
    event.preventDefault();
    handleModalContraseña();
    const data = new FormData(event.currentTarget);
    console.log(data.get("correo"));

    await axios
      .post(
        baseUrlContraseña,
        JSON.stringify({
          correo: data.get("correo"),
        }),
        header
      )
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar(
          "Se envio la solicitud para cambiar la contraseña a su correo!",
          {
            variant: "success",
          }
        );
      })
      .catch((error) => {
        //alert(error+"");
        console.log(error);
        enqueueSnackbar(
          "No se pudo enviar la solicitud de nueva contraseña al correo!",
          { variant: "error" }
        );
      });
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
              <Link
                component="button"
                variant="body2"
                onClick={handleModalContraseña}
              >
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
              <Link
                component="button"
                variant="body2"
                onClick={handleModalContraseña}
              >
                ¿Se te olvidó tu contraseña?
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Hidden>

      <Copyright sx={{ mt: 3, mb: 4 }} />

      {/*MODAL required new pasword*/}
      <BootstrapDialog
        onClose={handleModalContraseña}
        aria-labelledby="customized-dialog-title"
        open={openModalContraseña}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalContraseña}
        >
          Recuperación de cuenta
        </BootstrapDialogTitle>
        <form onSubmit={Contraseña}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <DialogContentText>
                  <strong>
                    Necesitamso algo de tiempo para revisar tu solicitud
                  </strong>
                  <br />
                  Introduce una dirección de correo electronico para que podamos
                  ponernos en contacto contigo más adelante{" "}
                </DialogContentText>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Introduce tu correo electronico"
                  name="correo"
                  type="email"
                  autoComplete="off"
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="inherit"
              onClick={handleModalContraseña}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              autoFocus
              type="submit"
              endIcon={<SendIcon />}
            >
              Enviar Correo
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
});
