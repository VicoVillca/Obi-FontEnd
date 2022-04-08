import React ,  { useEffect, useState ,useCallback} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//notifications
import { useSnackbar } from 'notistack';
//utiles para el webservise
import axios from 'axios';
import HOST from "variables/general.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END+"olimpiada";
const header = HOST.headerPublic();


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Niveles() {
  const { enqueueSnackbar } = useSnackbar();
  const [resultado,setResultado] = useState([]);
   //---    getAll    --//
 const getAll=useCallback(async()=>{

  await axios.get(baseUrl+'/'+cookies.get("olimpiada")+'/niveles',
    JSON.stringify({
      
    })
    ,header
  ).then(
    response => {
      setResultado(response?.data);
    }
  ).catch(
    error=>{
      //alert(error+"");
      setResultado([]);
      enqueueSnackbar(error+"", { variant :'error' })
    }
  )
  

},[setResultado,enqueueSnackbar]);
  useEffect(()=>{
    /// state
    getAll();
  },[getAll]);
  return (
    <Item>
    <Box sx={{ flexGrow: 1 }} paddingRight={5} paddingLeft={5}>
        <h1 className="section-heading">Niveles</h1>
        <p style={{fontStyle: 'italic'}}>Niveles habilitados en la olimpiada.</p>
      <Grid container spacing={5} marginTop={5}>
        {resultado.map((step, index) => (
            <Grid item xs={12} md={4} key={index} >
              <center>
                <Avatar 
                    sx={{ bgcolor: blue[600],  width: 108, height: 112}}
                >
                    <EmojiEventsIcon  sx={{ width: 56, height: 56 }}/>
                </Avatar>
              </center>
        <h3 >{step.nombre}</h3>
        <Typography>{step.descripcion.length < 100 ? step.descripcion : (step.descripcion.substring(0, 100)+'...') }</Typography>
        <Link className="ui button primary" to={`/nivel/${step.idNivel}`} style={{ textDecoration: 'none' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                <p >ver mas..</p>
                                </Typography>
                            </Link>
          </Grid>
        ))}
        
      </Grid>
    </Box>
    </Item>
  );
}
