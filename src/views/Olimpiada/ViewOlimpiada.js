import React, { useEffect, useState, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ReactMarkdown from "react-markdown";

import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import ListaEtapas from "views/Etapa/ListaEtapas";
import ListaNiveles from "views/Nivel/ListaNiveles";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

export default function Noticia() {
  //let { idNivel } = useParams();
  //let { idNivel } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    descripcion: "",
    fechaFin: "2000-12-30",
    fechaIni: "2000-12-30",
    fechaLimiteEdad: "2022-12-30",
    idOlimpiada: 1,
    nombre: "OLimpiada Z",
  });
  //---    GETBYID    --//
  const getById = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + cookies.get("olimpiada"), JSON.stringify({}), header)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setData, enqueueSnackbar]);

  useEffect(() => {
    /// state
    getById();
  }, [getById]);
  return (
    <div>
      <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
        <CardContent>
          <center>
            <Typography gutterBottom variant="h4" component="div">
              {data.nombre}
            </Typography>
          </center>

          <ReactMarkdown>{data.descripcion}</ReactMarkdown>
          <Typography variant="body2" color="text.secondary">
            Inicio: {format(new Date(data.fechaIni), "dd/MM/yyyy")} Final:{" "}
            {format(new Date(data.fechaFin), "dd/MM/yyyy")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Fecha Limite de edad:{" "}
            {format(new Date(data.fechaLimiteEdad), "dd/MM/yyyy")}
          </Typography>

          <ListaEtapas />
          <center>
            {" "}
            <ListaNiveles />
          </center>
        </CardContent>
      </Card>
    </div>
  );
}
