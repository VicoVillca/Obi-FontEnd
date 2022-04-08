import React, { useEffect, useState, useCallback } from "react";
import makeStyles from "@mui/styles/makeStyles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img/faces/marc.jpg";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
// input formularios
import TextField from "@mui/material/TextField";
// components dialog
import DialogActions from "@mui/material/DialogActions";

import { useSnackbar } from "notistack";
//cookie
import Cookies from "universal-cookie";
import axios from "axios";
import HOST from "variables/general.js";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "user";
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

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [usuario, setUsuario] = useState({
    idUser: 0,
    username: "",
    role: "",
    nombre: "",
    appaterno: "",
    apmaterno: "",
    correo: "",
    celular: "",
  });

  const handleChangle = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignOut = () => {
    /*cookies.remove('token',{path:"/"});
    cookies.remove('rol',{path:"/"});
    cookies.remove('olimpiada',{path:"/"});
    cookies.remove('nombreolimpiada',{path:"/"});
    window.location.href="/";
    */
  };
  //---    GETBYID    --//

  const getByToken = useCallback(async () => {
    await axios
      .get(baseUrl + "/profile", {
        headers: {
          "Content-Type": "application/json",
          auth: cookies.get("token"),
        },
      })
      .then((response) => {
        setUsuario(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [enqueueSnackbar]);
  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .patch(
        baseUrl + "/profile",
        JSON.stringify({
          username: usuario.username,
          role: usuario.role,
          nombre: usuario.nombre,
          appaterno: usuario.appaterno,
          apmaterno: usuario.apmaterno,
          correo: usuario.correo,
          celular: usuario.celular,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        getByToken();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  useEffect(() => {
    /// state

    getByToken();
  }, [getByToken]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
              <p className={classes.cardCategoryWhite}>Completa tu perfil</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={Update} id="create-course-form">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Nombre de Ususario"
                      name="UserName"
                      type="text"
                      value={usuario.username}
                      disabled
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="role"
                      label="Rol"
                      name="role"
                      type="text"
                      value={usuario.role}
                      disabled
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="nombre"
                      label="Nombre"
                      name="nombre"
                      type="text"
                      value={usuario.nombre}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="appaterno"
                      label="Apellido Paterno"
                      name="appaterno"
                      type="text"
                      value={usuario.appaterno}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="apmaterno"
                      label="Apellido Materno"
                      name="apmaterno"
                      type="text"
                      value={usuario.apmaterno}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      disabled
                      id="correo"
                      label="Correo"
                      name="correo"
                      type="email"
                      value={usuario.correo}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="celular"
                      label="Celular"
                      name="celular"
                      type="numeric"
                      value={usuario.celular}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                </GridContainer>
                <DialogActions>
                  <Button variant="contained" color="success" type="submit">
                    Actualizar Perfil
                  </Button>
                </DialogActions>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{cookies.get("username")}</h4>
              <h5 className={classes.cardCategory}>{cookies.get("rol")}</h5>
              <p className={classes.description}>
                Nuestro objetivo principal es coordinar y apoyar a los
                estudiantes en los diferentes niveles y etapas de la olimpiada
                con rumbo a la IOI y tener dignos representantes nacionales.
              </p>
              <Button color="danger" round onClick={handleSignOut}>
                <FingerprintIcon />
                Cambiar la Contraseña
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
