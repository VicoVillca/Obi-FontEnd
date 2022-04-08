
import React , {useEffect,  useState,useCallback } from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ReactMarkdown from 'react-markdown';

import {
  useParams
} from "react-router-dom";

import axios from 'axios';
import HOST from "variables/general.js";
import { format } from 'date-fns';
const baseUrl = HOST.URL_BACK_END+"etapa";
const header = HOST.headerPublic();

export default function Etapa() {
  //let { idNivel } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  let { idEtapa } = useParams();
  const [data, setData]= useState({
    "idEtapa": 1,
      "nombre": "",
      "descripcion": "",
      "fechaIni":"2000-12-31",
      "fechaFin":"2000-12-31",
      "tipo": "",
      "habilitados": 0
  })
      //---    GETBYID    --//
      const getById=useCallback(async()=>{

        await axios.get(baseUrl+'/'+idEtapa,
          JSON.stringify({
            
          })
          ,header
        ).then(
          response => {
            setData(response?.data);
              
          }
        ).catch(
          error=>{
            //alert(error+"");
            setData([]);
            enqueueSnackbar(error+"", { variant :'error' })
          }
        )
      },[idEtapa,setData,enqueueSnackbar]);
      
  useEffect(()=>{
    /// state
    getById();
  },[getById]);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" to={`/`} color="inherit" >
          Inicio
        </Link>
        <Typography color="text.primary"> Etapa</Typography>
      </Breadcrumbs>
      <Card sx={{ maxWidth: '100%' }}>
        
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
                        Fecha de Inicio: {format(new Date(data.fechaIni), 'dd/MM/yyyy')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fecha Final: {format(new Date(data.fechaFin), 'dd/MM/yyyy')}
                      </Typography>
          
          <ReactMarkdown>
            {data.descripcion}
          </ReactMarkdown>
        </CardContent>

      </Card>
    </div>
  );
}
