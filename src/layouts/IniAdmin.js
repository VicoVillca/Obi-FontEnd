import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
//notifications
import { useSnackbar } from "notistack";
//footer
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "components/Footer/Footer.js";
//icons
import LogoutIcon from "@mui/icons-material/Logout";
//tab
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ExtensionIcon from "@mui/icons-material/Extension";
import SchoolIcon from "@mui/icons-material/School";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
//Lista de componentes
import Olimpiada from "views/Olimpiada/CrudOlimpiadas";
import MaterialDeApoyo from "views/MaterialDeApoyo/MaterialDeApoyo";
import Distrito from "views/Distrito/CrudDistrito";
import Colegio from "views/Colegio/CrudColegio";
import Estudiantes from "views/Estudiante/Estudiantes";
import Usuario from "views/Usuario/CrudUsuario";
import UpdatePerfil from "views/Usuario/UpdatePerfil";
import UpdatePasword from "views/Usuario/UpdatePasword";

//Styles
// core components
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const cookies = new Cookies();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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
export default function ProminentAppBar() {
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState("1");
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalPasword, setOpenPasword] = useState(false);
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalPasword = () => {
    setOpenPasword(!openModalPasword);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSignOut = () => {
    console.log("salir");
    cookies.remove("token", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("olimpiada", { path: "/" });
    cookies.remove("nombreolimpiada", { path: "/" });
    window.location.href = "/";
  };
  useEffect(() => {
    /// state
    enqueueSnackbar("Bienvenido... al Panel de administrador !", {
      variant: "success",
    });
  }, [enqueueSnackbar]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Panel de Administrador
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={() => handleModalUpdate()}
              >
                <ManageAccountsIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={() => handleModalPasword()}
              >
                <FingerprintIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleSignOut}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <FingerprintIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleSignOut}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <TabContext value={value}>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            scrollButtons="auto"
            textColor="primary"
            variant="scrollable"
          >
            <Tab
              label={
                <>
                  <PrecisionManufacturingIcon />
                  Olimpiadas
                </>
              }
              value={"1"}
            />
            <Tab
              label={
                <>
                  <FavoriteIcon />
                  Material de apoyo
                </>
              }
              value={"2"}
            />
            <Tab
              label={
                <>
                  <ExtensionIcon />
                  Distritos
                </>
              }
              value={"3"}
            />
            <Tab
              label={
                <>
                  <SchoolIcon />
                  Colegios
                </>
              }
              value={"4"}
            />
            <Tab
              label={
                <>
                  <SupervisedUserCircleIcon />
                  Estudiantes
                </>
              }
              value={"5"}
            />

            <Tab
              label={
                <>
                  <SupervisedUserCircleIcon />
                  Usuarios
                </>
              }
              value={"6"}
            />
          </Tabs>
        </Box>
        <Box minHeight="70vh" sx={{ paddingRight: 5, paddingLeft: 5 }}>
          <TabPanel value={"1"}>
            <Olimpiada />
          </TabPanel>
          <TabPanel value={"2"}>
            <MaterialDeApoyo />
          </TabPanel>
          <TabPanel value={"3"}>
            <Distrito />
          </TabPanel>
          <TabPanel value={"4"}>
            <Colegio />
          </TabPanel>
          <TabPanel value={"5"}>
            <Estudiantes />
          </TabPanel>

          <TabPanel value={"6"}>
            <Usuario />
          </TabPanel>
        </Box>
        <Footer />
      </TabContext>

      {/*MODAL UPDATE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalUpdate}
        aria-labelledby="customized-dialog-title"
        open={openModalUpdate}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalUpdate}
        >
          Editar Perfil
        </BootstrapDialogTitle>

        <DialogContent>
          <UpdatePerfil func={handleModalUpdate} />
        </DialogContent>
      </BootstrapDialog>
      {/*MODAL Pasword New*/}

      <BootstrapDialog
        onClose={handleModalPasword}
        aria-labelledby="customized-dialog-title"
        open={openModalPasword}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalPasword}
        >
          Cambiar la Contraseña
        </BootstrapDialogTitle>

        <DialogContent>
          <UpdatePasword func={handleModalPasword} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
