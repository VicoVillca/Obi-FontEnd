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
const baseUrl = HOST.URL_BACK_END+"noticia";
const header = HOST.headerPublic();

export default function Noticia() {
  //let { idNivel } = useParams();
    //let { idNivel } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    let { idNoticia } = useParams();
    const [data, setData]= useState({
      "idNoticia": 1,
      "titulo": "",
      "subTitulo": "",
      "contenido": "",
      "fecha": "2000-12-31"
    })
        //---    GETBYID    --//
        const getById=useCallback(async()=>{
  
          await axios.get(baseUrl+'/'+idNoticia,
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
        },[idNoticia,setData,enqueueSnackbar]);
        
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
        <Typography color="text.primary"> Noticia </Typography>
        
      </Breadcrumbs>
      <Card sx={{ maxWidth: '100%',maxHeight: '100%' }}>
        
        
        <CardContent>
          <center>
           
            <Typography gutterBottom variant="h5" component="div">
              {data.titulo}
            </Typography>
            <Typography color="text.primary"> {data.subTitulo} </Typography>
            <Typography variant="body2" color="text.secondary">
                          Admin: {format(new Date(data.fecha), 'dd/MM/yyyy hh:mm')}
            </Typography>
          </center>
          <ReactMarkdown>
            {data.contenido}
          </ReactMarkdown>
        </CardContent>

      </Card>
    </div>
  );
}
