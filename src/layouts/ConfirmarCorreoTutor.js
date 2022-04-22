import React, { useState, useEffect, useCallback } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { experimentalStyled as styled } from "@mui/material/styles";
import avatar1 from "assets/img/imgloginedit.png";
//notifications
import { useSnackbar } from "notistack";

///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// components dialog
import DialogActions from "@mui/material/DialogActions";
import SaveIcon from "@mui/icons-material/Save";
//aspwrd input

//utiles para el webservise
import axios from "axios";
import HOST from "../variables/general.js";
import { useParams } from "react-router-dom";
const baseUrl = HOST.URL_BACK_END + "user";
const baseUrlAuth = HOST.URL_BACK_END + "auth";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

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

const useStyles = makeStyles(styles);
export default withRouter(function SignIn(props) {
  const { history } = props;
  let { token } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [usuario, setUsuario] = useState({
    idUser: "",
    pasword1: "",
    pasword2: "",
  });

  const handleChangle = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');

    await axios
      .post(
        baseUrlAuth + "/new-password",
        JSON.stringify({
          newPassword: usuario.pasword1,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
        }
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar(
          "Se modifico con exito contraseña la contraseña de su cuenta de tutor!",
          {
            variant: "success",
          }
        );
        history.push("/");
      })
      .catch((error) => {
        //alert(error+"");

        enqueueSnackbar("Error al guardar la contraseña", {
          variant: "error",
        });
        history.push("/");
      });
  };

  const getByToken = useCallback(async () => {
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .post(baseUrl + "/verificarCorreo", JSON.stringify({}), {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      })
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        console.log("respuesta weeee");
        console.log(response);
        setUsuario({
          idUser: response?.data.idUser,
          pasword1: "",
          pasword2: "",
        });
      })
      .catch((error) => {
        //alert(error+"");
        history.push("/");
      });
  }, [setUsuario, token, history]);

  useEffect(() => {
    /// state

    getByToken();
  }, [getByToken]);

  return (
    <div>
      {/*MODAL Pasword New*/}

      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth={"xs"}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar1} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h3 className={classes.cardTitle}>Bienvenido al TEAM</h3>
                <form onSubmit={Update}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      Agrega una contraseña segura a tu cuenta,Una constraseña
                      segura contribuye a evitar el acceso no autorizado a la
                      cuenta de Tutor.
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="pasword1"
                        label="Contraseña"
                        name="pasword1"
                        type="password"
                        value={usuario.pasword1}
                        autoComplete="off"
                        inputProps={{ minLength: 8 }}
                        onChange={handleChangle}
                        helperText="8 caracteres como minimo. distingue mayusculas de minusculas"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="pasword2"
                        label="Repita la contraseña"
                        name="pasword2"
                        type="password"
                        value={usuario.pasword2}
                        autoComplete="off"
                        onChange={handleChangle}
                      />
                      {usuario.pasword1.length >= 8 &&
                      usuario.pasword2.length >= 2 &&
                      usuario.pasword1 !== usuario.pasword2 ? (
                        <Alert severity="error">
                          Las Contraseñas no son iguales
                        </Alert>
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>

                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SaveIcon />}
                      disabled={
                        usuario.pasword1.length >= 8 &&
                        usuario.pasword2.length >= 2 &&
                        usuario.pasword1 === usuario.pasword2
                          ? false
                          : true
                      }
                    >
                      Aceptar y continuar
                    </Button>
                  </DialogActions>
                </form>
              </CardBody>
            </Card>
          </Box>
          <Copyright />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
});
