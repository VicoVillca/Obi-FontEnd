import React, { useEffect, useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import WorkIcon from "@mui/icons-material/Work";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
///ELEMENTS FOR DIALOG

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

//FORMULARIOS
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//alert full components util
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
//components alert
//utiles para el webservise
import Tarea from "views_user/Coordinador/Tarea";
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "coordinador";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FolderList(props) {
  const [consoleSeleccionada, setConsolaSeleccionada] = useState({
    area: "Nacional",
    codigo: "",
    idCoordinador: 1,
    nivel: {},
  });
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [tarea, setTarea] = React.useState([]);
  let idEtapa = props.idEtapa;
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const seleccionarConsola = (consola) => {
    setConsolaSeleccionada(consola);
    handleClickOpen();
  };
  const getAllTareas = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/tareas/" + idEtapa,
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        setTarea(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [idEtapa, enqueueSnackbar]);
  useEffect(() => {
    getAllTareas();
  }, [getAllTareas]);
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {tarea.length === 0 ? (
          <Alert severity="info">
            <AlertTitle>No tienes tareas</AlertTitle>
            Asignadas en esta — <strong>Etapa!</strong>
          </Alert>
        ) : (
          ""
        )}
        {tarea.map((step, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={step.nivel.nombre}
              secondary={"Coordinador " + step.area + " " + step.codigo}
            />

            <Button
              variant="outlined"
              startIcon={<PrecisionManufacturingIcon />}
              onClick={() => {
                seleccionarConsola(step);
              }}
            >
              Organizar
            </Button>
          </ListItem>
        ))}
      </List>

      {/** dialog insert Student */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Tarea de coordinador
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Tarea idCoordinador={consoleSeleccionada.idCoordinador} />
          </GridItem>
        </GridContainer>
      </Dialog>
    </>
  );
}
