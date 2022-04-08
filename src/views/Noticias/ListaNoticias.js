import React ,  { useEffect, useState ,useCallback}from "react";
import { Link } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import makeStyles from '@mui/styles/makeStyles';
// core components
//auspiciadores
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//logos
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';


//notifications
import { useSnackbar } from 'notistack';
//utiles para el webservise
import axios from 'axios';
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
import { format } from 'date-fns';
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END+"olimpiada";
const header = HOST.headerPublic();




const useStyles = makeStyles(styles);

export default function Noticias() {
    // styles
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();
    const [not,setResultado] = useState([]);
     //---    getAll    --//
   const getAll=useCallback(async()=>{
  
    await axios.get(baseUrl+'/'+cookies.get("olimpiada")+'/noticias',
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
        <div >
            <Card >
                <CardHeader color = "primary" >
                    <h4 className = {
                        classes.cardTitleWhite
                    } > 
                        NOTICIAS
                    </h4>  
                </CardHeader> 
                <CardContent>
                    {not.map((step, index) => (
                        <CardContent key={step.idNoticia}>
                            <Link className="ui button primary" to={`/noticia/${step.idNoticia}`} style={{ textDecoration: 'none' }}>
                                <Typography gutterBottom variant="h7" component="div">
                                    {step.titulo.length < 50 ? step.titulo : (step.titulo.substring(0, 50)+'...') }
                                </Typography>
                            </Link>
                          
                            <Typography variant="body2" color="text.secondary">
                                publicado:{format(new Date(step.fecha), 'dd/MM/yyyy')}  
                            </Typography>
                        </CardContent>
))}

                </CardContent>
            </Card> 
        </div>
    );
}
