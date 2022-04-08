import React, { useEffect, useCallback } from "react";
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
import { Link } from "react-router-dom";

//components alert
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "coordinador";

export default function FolderList(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [tarea, setTarea] = React.useState([]);
  let idEtapa = props.idEtapa;

  const getAllEquipos = useCallback(async () => {
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
    getAllEquipos();
  }, [getAllEquipos]);
  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
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

          <Link
            className="ui button primary"
            to={`/tarea/${step.idCoordinador}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              startIcon={<PrecisionManufacturingIcon />}
            >
              Organizar
            </Button>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
