import React, { useEffect, useState, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import ReactMarkdown from "react-markdown";
import LinkIcon from "@mui/icons-material/Link";

import { useParams } from "react-router-dom";

import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END + "nivel";
const header = HOST.headerPublic();

export default function Nivel() {
  //let { idNivel } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  let { idNivel } = useParams();
  const [material, setMaterial] = useState([]);
  const [data, setData] = useState({
    idNivel: 1,
    nombre: "",
    descripcion: "",
    limiteEdad: 15,
    limitePorGrupo: 2,
  });

  //---    GETBYID    --//
  const getById = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + idNivel, JSON.stringify({}), header)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setData([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [idNivel, setData, enqueueSnackbar]);

  //---    GETMATERIAL   --//
  const getAllMaterial = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + idNivel + "/material", JSON.stringify({}), header)
      .then((response) => {
        console.log(response?.data);
        setMaterial(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setMaterial([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [idNivel, setMaterial, enqueueSnackbar]);

  useEffect(() => {
    /// state
    getById();

    getAllMaterial();
  }, [getById, getAllMaterial]);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" to={`/`} color="inherit">
          Inicio
        </Link>
        <Typography color="text.primary"> Nivel </Typography>
      </Breadcrumbs>
      <Card sx={{ maxWidth: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Limite de edad: {data.limiteEdad} años
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estudiantes por grupo: {data.limitePorGrupo} maximo
          </Typography>

          <ReactMarkdown>{data.descripcion}</ReactMarkdown>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Material de Apoyo
          </Typography>

          <Box sx={{ flexGrow: 1 }} paddingRight={5} paddingLeft={5}>
            <Grid container spacing={5} marginTop={5}>
              {material.length === 0 ? (
                <center>No hay recomendaciones</center>
              ) : (
                ""
              )}
              {material.map((step, index) => (
                <Grid item xs={12} md={4} key={step.idMaterial}>
                  <center>
                    <Avatar
                      sx={{ bgcolor: blue[600], width: 108, height: 112 }}
                    >
                      <LinkIcon sx={{ width: 56, height: 56 }} />
                    </Avatar>
                    <Typography gutterBottom variant="h5" component="div">
                      {step.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.subTitulo.length < 100
                        ? step.subTitulo
                        : step.subTitulo.substring(0, 100) + "..."}
                    </Typography>
                    <Link
                      underline="hover"
                      to={{ pathname: step.archivo }}
                      target="_blank"
                    >
                      <Typography gutterBottom variant="h6" component="div">
                        <p>Ver enlace</p>
                      </Typography>
                    </Link>
                  </center>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
