import React ,  { useEffect, useState ,useCallback} from 'react';

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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
///search component
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
/// elements for select 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
///search component
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
//notifications
import { useSnackbar } from 'notistack';
import {departamentos,dependencias} from "variables/general";
//utiles para el webservise
import axios from 'axios';
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END+"colegio";
const baseUrlDistrito = HOST.URL_BACK_END+"distrito";
const header = HOST.headerPublic();
//galletitas
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
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[300],
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
  const [ciudad, setCiudad] = useState('Todos');
  const [distritos, setDistritos] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);

  const [resultado2,setResultado2] = useState([]);
  const [resultado,setResultado] = useState([]);
  const inicialState ={
    "sie": "",
    "nombre": "",
    "zona": "",
    "direccion": "",
    "celular": "",
    "dependencia": "",
    "distrito": {"idDistrito":'','nombre':'','departamento':''}
  }
  const [consoleSeleccionada, setConsolaSeleccionada]= useState(inicialState)
  const handleChangeSearch = (event) => {
    setBuscar(event.target.value);

    if(1>event.target.value.length)
      setResultado2(resultado);
    else{
      var city = event.target.value;
      var val = resultado.filter( 
        r => (r.sie+ r.nombre+r.zona+r.direccion+r.celular+r.dependencia).toLowerCase().includes(city.toLowerCase())
      );
      setResultado2(val);
      setCiudad('Todos');
    }
  };
  const handleChangeCity = (event) => {
    setCiudad(event.target.value);
    if(event.target.value === 'Todos')
      setResultado2(resultado);
    else{
      var city = event.target.value;
      var val = resultado.filter( 
        r => (r.distrito.departamento).includes(city)
      );
      setBuscar('');
      setResultado2(val);
    }
  };
  
  const handleChangle = e => {
    const {name, value}= e.target;
    if(name==='idDistrito'){
       const val = {"idDistrito":value,'nombre':'','departamento':''}
       const nam="distrito";
       setConsolaSeleccionada(prevState=>({
        ...prevState,
        [nam]:val
      }))
    }else{
      setConsolaSeleccionada(prevState=>({
        ...prevState,
        [name]:value
      }))
    }
      
    
    
    
  }
  const handleModalInsert = () => {
    //limpiarFormulario();
    setConsolaSeleccionada(inicialState);
    setOpenInsert(!openModalInsert);
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarData =(consola,caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?handleModalUpdate():handleModalDelete();
  };
    /*******************************************************
   *                     GRUDS              
   * *****************************************************/
  //---    INSERT    --//
  const Insert=async(event)=>{
    event.preventDefault();
    handleModalInsert();
    
    await axios.post(baseUrl,
      JSON.stringify({
          "sie":consoleSeleccionada.sie,
          "nombre":consoleSeleccionada.nombre,
          "zona": consoleSeleccionada.zona,
          "direccion": consoleSeleccionada.direccion,
          "celular": consoleSeleccionada.celular,
          "dependencia": consoleSeleccionada.dependencia,
          "idDistrito":consoleSeleccionada.distrito.idDistrito
      })
      ,header
    ).then(
      response => {
          //showNotificationSuccess('success','Grupo guardado con exito');
          enqueueSnackbar('Se agrego el Distrito!', { variant :'success' });
          getAll();
      }
    ).catch(
      error=>{
        //alert(error+"");
        enqueueSnackbar(error+"", { variant :'error' })
      }
    )
    
  };

    //---    UPDATE    --//
    const Update=async(event)=>{
      event.preventDefault();
      handleModalUpdate();
      //showNotificationSuccess('success','Se modifico los datos con exito');
      await axios.patch(baseUrl+"/"+consoleSeleccionada.sie,
        JSON.stringify({
          "nombre":consoleSeleccionada.nombre,
          "zona": consoleSeleccionada.zona,
          "direccion": consoleSeleccionada.direccion,
          "celular": consoleSeleccionada.celular,
          "dependencia": consoleSeleccionada.dependencia,
          "idDistrito":consoleSeleccionada.distrito.idDistrito
        })
        ,header
      ).then(
        response => {
            //showNotificationSuccess('success','Grupo guardado con exito');
            enqueueSnackbar('Se Guardo los cambios con exito!', { variant :'success' });
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

    await axios.delete(baseUrl+"/"+consoleSeleccionada.sie
      ,header
    ).then(
      response => {
          //showNotificationSuccess('success','Grupo guardado con exito');
          enqueueSnackbar('Eliminamos el Colegio!', { variant :'success' });
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
          setResultado(response?.data);
          setResultado2(response?.data);
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

  const getAllDistritos=useCallback(async()=>{

    await axios.get(baseUrlDistrito,
      JSON.stringify({
        
      })
      ,header
    ).then(
      response => {
          setDistritos(response?.data);
      }
    ).catch(
      error=>{
        //alert(error+"");
        setDistritos([]);
      }
    )
    
  
  },[setDistritos]);

  useEffect(()=>{
    /// state
    getAll();
    getAllDistritos();
  },[getAll,getAllDistritos]);
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
                      
                        Lista de Colegios
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
                        
                      <Box sx={{ maxWidth: 150,minWidth: 150,marginRight:1 }}>
                        
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ciudad}
                            label="Departamento"
                            onChange={handleChangeCity}
                            defaultValue={0}

                          >
                            <MenuItem value={'Todos'}>Todos</MenuItem>
                            {departamentos.map((row, index) => (
                              <MenuItem key={index} value={row.abr}>{row.nombre}</MenuItem>
                            ))}
                           
                          </Select>
                        </FormControl>
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
            <TableCell align="left">Sie</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Zona</TableCell>
            <TableCell align="left">Dirección</TableCell>
            <TableCell align="left">Celular</TableCell>
            <TableCell align="left">Dependencia</TableCell>
            <TableCell align="center">Distrito</TableCell>
            <TableCell align="center">Departamento</TableCell>
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
                
                {row.sie}
                
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="left">{row.zona}</TableCell>
              <TableCell align="left">{row.direccion}</TableCell>
              <TableCell align="left" style={{ width: 70 }}>{row.celular}</TableCell>
              <TableCell align="center" style={{ width: 100 }} >
               
                <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', p: 0 ,borderRadius: '30px' }}>
                  
                  {dependencias.map((r, index) => (
                      (row.dependencia===r.abr)?r.nombre:''
                  ))}
                </Box>
               
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>{row.distrito.nombre}</TableCell>
              <TableCell align="center" style={{ width: 100 }}>
               
                <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 0 ,borderRadius: '30px' }}>
                  
                  {departamentos.map((r, index) => (
                      (row.distrito.departamento===r.abr)?r.nombre:''
                  ))}
                </Box>
               
              </TableCell>
              
              <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={()=>{seleccionarData(row,'Editar')}}  >
                  <EditIcon  />
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
              maxWidth={'sm'}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalInsert}>
                Adicionar
              </BootstrapDialogTitle>
              <form onSubmit={Insert} id="create-course-form">
              <DialogContent dividers>
                  <GridContainer>

                    <GridItem xs={12} sm={6} md={6}>

                    <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="sie"
                          label="Sie de Colegio"
                          name="sie"
                          type="number"
                          autoComplete="off"
                          value={consoleSeleccionada.sie}
                          onChange={handleChangle}
                        />

                        
                    </GridItem>

                    <GridItem  xs={12} sm={6} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          
                          id="nombre"
                          label="nombre"
                          name="nombre"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.nombre}
                          onChange={handleChangle}
                        />
                    </GridItem>

                    <GridItem  xs={12} sm={12} md={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="zona"
                          label="zona"
                          name="zona"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.zona}
                          onChange={handleChangle}
                        />
                    </GridItem>
                    <GridItem  xs={12} sm={12} md={4}>
                        
                        <TextField
                          variant="outlined"
                          margin="normal"
                          id="direccion"
                          label="direccion"
                          name="direccion"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.direccion}
                          onChange={handleChangle}
                        />
                    </GridItem>

                   

                    <GridItem  xs={12} sm={12} md={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="celular"
                          label="celular"
                          name="celular"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.celular}
                          onChange={handleChangle}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 20, marginTop:2}}>
                        
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Dependendias</InputLabel>
                          <Select
                          fullWidth
                            labelId="tipo-label"
                            id="dependencia"
                            name="dependencia"
                            label="dependencia"
                            value={consoleSeleccionada.dependencia}
                            onChange={handleChangle}

                          >
                            
                            {dependencias.map((row, index) => (
                              <MenuItem key={index} value={row.abr}>{row.nombre}</MenuItem>
                            ))}
                           
                          </Select>
                        </FormControl>
                      </Box>
                        
                      </Typography>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 20, marginTop:2}}>
                        
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
                          <Select
                          fullWidth
                            labelId="tipo-label"
                            id="idDistrito"
                            name="idDistrito"
                            label="distrito"
                            value={consoleSeleccionada.distrito.idDistrito}
                            onChange={handleChangle}

                          >
                            
                            {distritos.map((row, index) => (
                              <MenuItem key={index} value={row.idDistrito}>{row.nombre} - {row.departamento}</MenuItem>
                            ))}
                           
                          </Select>
                        </FormControl>
                      </Box>
                        
                      </Typography>
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





            {/*MODAL UPDATE NEW ELEMENT*/}
          <BootstrapDialog
              onClose={handleModalUpdate}
              aria-labelledby="customized-dialog-title"
              open={openModalUpdate}
              maxWidth={'sm'}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalUpdate}>
                Editar
              </BootstrapDialogTitle>
              <form onSubmit={Update} >
              <DialogContent dividers>
              <GridContainer>

                    <GridItem xs={12} sm={6} md={6}>

                    <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="sie"
                          label="Sie de Colegio"
                          name="sie"
                          type="number"
                          autoComplete="off"
                          disabled
                          value={consoleSeleccionada.sie}
                          onChange={handleChangle}
                        />

                        
                    </GridItem>

                    <GridItem  xs={12} sm={6} md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          
                          id="nombre"
                          label="nombre"
                          name="nombre"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.nombre}
                          onChange={handleChangle}
                        />
                    </GridItem>

                    <GridItem  xs={12} sm={12} md={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="zona"
                          label="zona"
                          name="zona"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.zona}
                          onChange={handleChangle}
                        />
                    </GridItem>
                    <GridItem  xs={12} sm={12} md={4}>
                        
                        <TextField
                          variant="outlined"
                          margin="normal"
                          id="direccion"
                          label="direccion"
                          name="direccion"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.direccion}
                          onChange={handleChangle}
                        />
                    </GridItem>

                   

                    <GridItem  xs={12} sm={12} md={4}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="celular"
                          label="celular"
                          name="celular"
                          type="text"
                          autoComplete="off"
                          value={consoleSeleccionada.celular}
                          onChange={handleChangle}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 20, marginTop:2}}>
                        
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Dependendias</InputLabel>
                          <Select
                          fullWidth
                            labelId="tipo-label"
                            id="dependencia"
                            name="dependencia"
                            label="dependencia"
                            value={consoleSeleccionada.dependencia}
                            onChange={handleChangle}

                          >
                            
                            {dependencias.map((row, index) => (
                              <MenuItem key={index} value={row.abr}>{row.nombre}</MenuItem>
                            ))}
                           
                          </Select>
                        </FormControl>
                      </Box>
                        
                      </Typography>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <Typography gutterBottom variant="h6" component="div">
                        
                      <Box sx={{ minWidth: 20, marginTop:2}}>
                        
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Distrito</InputLabel>
                          <Select
                          fullWidth
                            labelId="tipo-label"
                            id="idDistrito"
                            name="idDistrito"
                            label="distrito"
                            value={consoleSeleccionada.distrito.idDistrito}
                            onChange={handleChangle}

                          >
                            
                            {distritos.map((row, index) => (
                              <MenuItem key={index} value={row.idDistrito}>{row.nombre} - {row.departamento}</MenuItem>
                            ))}
                           
                          </Select>
                        </FormControl>
                      </Box>
                        
                      </Typography>
                    </GridItem>
                    
                   

                    
                    
                  </GridContainer>
              </DialogContent>
              <DialogActions>
                <Button variant="text" color="inherit" onClick={handleModalUpdate}>
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
                      Esta seguro que quiere eliminar el colegio <strong>{consoleSeleccionada.nombre}</strong>?
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
