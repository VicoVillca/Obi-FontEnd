import React, { useEffect, useState, useCallback } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@mui/material/Button";
// input formularios
import TextField from "@mui/material/TextField";
// components dialog
import DialogActions from "@mui/material/DialogActions";
import SaveIcon from "@mui/icons-material/Save";
import { useSnackbar } from "notistack";
//cookie
import Cookies from "universal-cookie";
import axios from "axios";
import HOST from "variables/general.js";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "user";

export default function UserProfile(props) {
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
        console.log(response);
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
        props.func();
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
      })
      .catch((error) => {
        props.func();
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  useEffect(() => {
    /// state

    getByToken();
  }, [getByToken, props]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
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
              <Button
                variant="outlined"
                color="primary"
                onClick={() => props.func()}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Actualizar Perfil
              </Button>
            </DialogActions>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
