import React, { useEffect, useState } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
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
const baseUrl = HOST.URL_BACK_END + "auth/change-password";
export default function UserProfile(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [usuario, setUsuario] = useState({
    pasword: "",
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

  //---    GETBYID    --//

  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .post(
        baseUrl,
        JSON.stringify({
          oldPassword: usuario.pasword,
          newPassword: usuario.pasword1,
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
        enqueueSnackbar("Se Guardo la contraseña con exito!", {
          variant: "success",
        });
      })
      .catch((error) => {
        props.func();
        //alert(error+"");
        enqueueSnackbar("No se pudo modificar la contraseña.", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    /// state
  }, [props]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={Update} id="create-course-form">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                Una constraseña segura contribuye a evitar el acceso no
                autorizado a la cuenta de usuario.
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="pasword"
                  label="Contraseña actual"
                  name="pasword"
                  type="password"
                  value={usuario.pasword}
                  autoComplete="off"
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="pasword1"
                  label="Contraseña Nueva"
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
                  <Alert severity="error">Las Contraseñas no son iguales</Alert>
                ) : (
                  ""
                )}
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
                disabled={
                  usuario.pasword1 === usuario.pasword2 &&
                  usuario.pasword.length >= 1 &&
                  usuario.pasword1.length >= 8
                    ? false
                    : true
                }
                startIcon={<SaveIcon />}
              >
                Guardar Contraseña Nueva
              </Button>
            </DialogActions>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
