import React ,  { useEffect, useState,useCallback } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
/// elements for select 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//icons
import AddIcon from '@mui/icons-material/Add';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
///search component
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
///ELEMENTS FOR DIALOG

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//FORMULARIOS
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//notifications
import { useSnackbar } from 'notistack';
//galletitas
//utiles para el webservise
import axios from 'axios';
import Cookies from "universal-cookie";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END+"olimpiada";
const cookies = new Cookies();
const header = HOST.headerPublic();

//Modal elements
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
//initialñ state

export default function Olimpiada() {
  const { enqueueSnackbar } = useSnackbar();
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [buscar, setBuscar] = useState('');
  const [resultado2,setResultado2] = useState([]);
  const [resultado,setResultado] = useState([]);
  const inicialState ={
    "idOlimpiada": 0,
    "nombre":"",
    "descripcion":"",
    "fechaIni":"2000-12-31",
    "fechaFin":"2000-12-31",
    "fechaLimiteEdad":"2000-12-31"
  }
  const [consoleSeleccionada, setConsolaSeleccionada]= useState(inicialState)
  const handleChangeSearch = (event) => {
    setBuscar(event.target.value);

    if(1>event.target.value.length)
      setResultado2(resultado);
    else{
      var city = event.target.value;
      var val = resultado.filter( 
        r => (r.nombre).includes(city)
      );
      setResultado2(val);
    }
  };
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
    
  }
  const handleModalInsert = () => {
    //limpiarFormulario();
    setConsolaSeleccionada(inicialState);
    setOpenInsert(!openModalInsert);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarData =(consola,caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?SelectOlimpiada(consola):handleModalDelete();
  };
  const SelectOlimpiada = (consola) =>{
    cookies.set('olimpiada',consola.idOlimpiada, {path:"/"});
    cookies.set('nombreolimpiada',consola.nombre, {path:"/"});
    window.location.href="./";
  }
    /*******************************************************
   *                     GRUDS              
   * *****************************************************/
  //---    INSERT    --//
  const Insert=async(event)=>{
    event.preventDefault();
    handleModalInsert();
    await axios.post(baseUrl,
      JSON.stringify({
        "nombre":consoleSeleccionada.nombre,
        "descripcion":consoleSeleccionada.descripcion,
        "fechaIni":consoleSeleccionada.fechaIni,
        "fechaFin":consoleSeleccionada.fechaFin,
        "fechaLimiteEdad":consoleSeleccionada.fechaLimiteEdad
      })
      ,header
    ).then(
      response => {
        console.log(response);
          //showNotificationSuccess('success','Grupo guardado con exito');
          enqueueSnackbar('Se agrego la nueva olimpiada!', { variant :'success' });
          getAll();
      }
    ).catch(
      error=>{
        //alert(error+"");
        enqueueSnackbar(error+"", { variant :'error' })
      }
    )
    
  };

  //---    DELETE    --//
  const Delete=async(event)=>{
    event.preventDefault();
    handleModalDelete();

    await axios.delete(baseUrl+"/"+consoleSeleccionada.idOlimpiada
      ,header
    ).then(
      response => {
        console.log(response);
          //showNotificationSuccess('success','Grupo guardado con exito');
          enqueueSnackbar('Eliminamos la olimpiada!', { variant :'success' });
          getAll();
      }
    ).catch(
      error=>{
        //alert(error+"");
        enqueueSnackbar(error+"", { variant :'error' })
      }
    )
    //showNotificationSuccess('success','Se elimino el grupo');
   
  };
  //---    getAllColegios    --//
  const getAll=useCallback(async()=>{


    await axios.get(baseUrl,
      JSON.stringify({
      })
      ,header
    ).then(
      response => {
        console.log(response?.data?.olimpiadas);
          setResultado(response?.data?.olimpiadas);
          setResultado2(response?.data?.olimpiadas);
      }
    ).catch(
      error=>{
        //alert(error+"");
        setResultado([]);
        setResultado2([]);
        enqueueSnackbar(error+"", { variant :'error' })
      }
    )
  },[setResultado,setResultado2,enqueueSnackbar]);

  useEffect(()=>{
    getAll();
    },[getAll]);
  return (
    <div >
      {/**
       * en este lugar mostramos las notas pero necesitamos una variable mas el cod que describira el distrito / departamento o nacional
       */}
      {/*<PDFViewer style={{ width: "100%", height: "90vh" }}>*/}
              {/*<DocuPDF poema={poema} />*/}
            {/*</PDFViewer>*/}
            {/** Nro - Nota - Equipo - Departamento -  U. Educativa */}
            

            <Grid container alignItems="center" >
                    <Grid item xs >
                    
                      <Typography gutterBottom variant="h4" component="div">
                      
                        Lista de Olimpiadas
                      </Typography>
                      
                    </Grid>
                    
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 320 ,marginRight:1}}>
                      
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="fechaNac"
                        label="Buscar..."
                        name="fechaNac"
                        type="text"
                        onChange={handleChangeSearch}
                        value={buscar}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      </Box>
                        
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 25 }}>
                      <Button color='success' variant="contained" onClick={handleModalInsert} startIcon={<AddIcon  />}>Adicionar</Button>
                        
                      </Box>
                        
                      </Typography>
                    </Grid>
                  </Grid>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 10 }}>Nro</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center" style={{ width: 200 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado2.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" style={{ width: 10 }}  component="th" scope="row">
                
                {index+1}
                
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="center" style={{ width: 100 }}>
                {(row.visible)?
                <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 0 ,borderRadius: '30px' }}>
                  Visible
                </Box>
                :
                <VisibilityOffIcon/>
                }
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={()=>{seleccionarData(row,'Editar')}}  >
                  <PrecisionManufacturingIcon  />
                </Button>
                <Button variant="outlined" color="error" onClick={()=>{seleccionarData(row,'Eliminar')} } >
                  <DeleteIcon  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/** MODAL  */}
    {/*MODAL INSERT NEW ELEMENT*/}
    <BootstrapDialog
              onClose={handleModalInsert}
              aria-labelledby="customized-dialog-title"
              open={openModalInsert}
              maxWidth='10%'
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalInsert}>
                Adicionar
              </BootstrapDialogTitle>
              <form onSubmit={Insert} id="create-course-form">
              <DialogContent dividers>
                  <GridContainer>
                    <GridItem  xs={12} sm={12} md={12}>
                      <Box sx={{ minWidth: 120,marginLeft:2,marginRight:2 }}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="nombre"
                          label="Nombre del olimpiada"
                          name="nombre"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.nombre}
                          onChange={handleChangle}
                        />
                      </Box>
                    </GridItem>
                    
                    
                   

                    
                    
                  </GridContainer>
              </DialogContent>
              <DialogActions>
                <Button variant="text" color="inherit" onClick={handleModalInsert}>
                  Cancelar
                </Button>
                <Button variant="contained" color="success" autoFocus type="submit">
                  Guardar
                </Button>
              </DialogActions>
              </form>
            </BootstrapDialog>
            {/*MODAL DELETE NEW ELEMENT*/}
          <BootstrapDialog
              onClose={handleModalDelete}
              aria-labelledby="customized-dialog-title"
              open={openModalDelete}
              maxWidth='10%'
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalDelete}>
                Eliminar
              </BootstrapDialogTitle>
              <form onSubmit={Delete} >
              <DialogContent dividers>
                  <GridContainer>
                    
                    
                    <GridItem  xs={12} sm={12} md={12}>
                      Esta seguro que quiere eliminar <strong>{consoleSeleccionada.nombre}</strong>?
                    </GridItem>
                   

                    
                    
                  </GridContainer>
              </DialogContent>
              <DialogActions>
                <Button variant="text" color="inherit" onClick={handleModalDelete}>
                  Cancelar
                </Button>
                <Button variant="contained" color="error" autoFocus type="submit">
                  Eliminar
                </Button>
              </DialogActions>
              </form>
            </BootstrapDialog>
      
    </div>
  );
}
