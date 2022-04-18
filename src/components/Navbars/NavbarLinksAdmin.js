import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
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
    cookies.remove("token", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("olimpiada", { path: "/" });
    cookies.remove("nombreolimpiada", { path: "/" });
    window.location.href = "/";
  };
  const handleOutOLimpiada = () => {
    console.log("cambiar olimpiada");
    cookies.remove("olimpiada", { path: "/" });
    cookies.remove("nombreolimpiada", { path: "/" });
    window.location.href = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOutOLimpiada}>Cambiar de Olimpiada</MenuItem>
      <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.manager}>
        {cookies.get("nombreolimpiada")}
        <Button
          variant="text"
          endIcon={<SettingsIcon />}
          onClick={handleProfileMenuOpen}
        >
          {cookies.get("username")}
        </Button>
        {renderMenu}
      </div>
    </div>
  );
}
