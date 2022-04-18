import * as React from "react";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
//footer
import Footer from "components/Footer/Footer.js";
//icons
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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
import UserProfile from "views/Usuario/PerfilUsuario";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import avatar1 from "assets/img/reactlogo.png";
//Styles
// core components

//instancias de variabvles
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 2,
  },
}));
const useStyles = makeStyles(styles);
const cookies = new Cookies();
export default function ProminentAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

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
  return (
    <>
      <AppBar position="static" color={"primary"}>
        <StyledToolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-end" }}
          >
            <img src={avatar1} width={20} height={20} alt="logo1" />
            Olimpiada Boliviana de Informatica
          </Typography>

          <div className={classes.manager}>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleSignOut}
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </StyledToolbar>
      </AppBar>

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
                  <ManageAccountsIcon />
                  Perfil
                </>
              }
              value={"6"}
            />
            <Tab
              label={
                <>
                  <SupervisedUserCircleIcon />
                  Usuarios
                </>
              }
              value={"7"}
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
            <UserProfile />
          </TabPanel>
          <TabPanel value={"7"}>
            <Usuario />
          </TabPanel>
        </Box>
        <Footer />
      </TabContext>
    </>
  );
}
