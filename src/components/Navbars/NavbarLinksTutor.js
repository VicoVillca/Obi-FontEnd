import React from "react";
import {
  Link
} from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Menu from '@mui/material/Menu';
import Cookies from "universal-cookie";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);
const cookies = new Cookies();
export default function AdminNavbarLinks() {
  const classes = useStyles();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    console.log("salir");
    cookies.remove('token',{path:"/"});
    cookies.remove('rol',{path:"/"});
    
    window.location.href="/";
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to="/perfil" >
          Perfil
        </Link>
      </MenuItem>
      <MenuItem onClick={handleSignOut}>Salir</MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.manager}>
            
            <Link to="/" className={classes.link}>
              INICIO
            </Link>
            <Link to="/inscripcion" className={classes.link}>
              INSCRIPCIÓN
            </Link>
            <Link to="/Notas" className={classes.link}>
              NOTAS DE EVALUACIÓN
            </Link>
            <Link to="/info" className={classes.link}>
              ¿QUIENES SOMOS?
            </Link>
          <Button  variant="inherit" endIcon={<ManageAccountsIcon /> } onClick={handleProfileMenuOpen}>
              {cookies.get('username')}
          </Button>
          {renderMenu}
      </div>
    </div>
  );
}
