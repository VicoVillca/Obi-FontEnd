import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

// core components
import Admin from "layouts/Admin.js";
import Tutor from "layouts/Tutor.js";
import SignIn from "layouts/SignIn.js";
import Inicio from "layouts/Inicio.js";
import IniAdmin from "layouts/IniAdmin.js";
import Coordinador from "layouts/Coordinador.js";
import Recuperar from "layouts/Recuperar.js";
import ConfirmarCorreoEstudiante from "layouts/ConfirmarCorreoEstudiante";
import ConfirmarCorreoTutor from "layouts/ConfirmarCorreoTutor";
import Cookies from "universal-cookie";
import { SnackbarProvider } from "notistack";
const cookies = new Cookies();
const theme = createTheme();
const hist = createBrowserHistory();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <StyledEngineProvider injectFirst>
          <Router history={hist}>
            <Switch>
              <Route exact path="/recuperar/:token" component={Recuperar} />
              <Route
                exact
                path="/confirmarCorreo/:token"
                component={ConfirmarCorreoEstudiante}
              />
              <Route
                exact
                path="/confirmarCorreoTutor/:token"
                component={ConfirmarCorreoTutor}
              />
              {cookies.get("rol") !== undefined ? (
                <>
                  {cookies.get("olimpiada") !== undefined ? (
                    <>
                      {cookies.get("rol") === "ADMIN" ? (
                        <Route path="/" component={Admin} />
                      ) : (
                        ""
                      )}
                      {cookies.get("rol") === "TUTOR" ? (
                        <Route path="/" component={Tutor} />
                      ) : (
                        ""
                      )}
                      {cookies.get("rol") === "COORDINADOR" ? (
                        <Route path="/" component={Coordinador} />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      {cookies.get("rol") === "ADMIN" ? (
                        <Route path="/" component={IniAdmin} />
                      ) : (
                        <Route path="/" component={Inicio} />
                      )}{" "}
                    </>
                  )}
                </>
              ) : (
                <Route path="/" component={SignIn} />
              )}
            </Switch>
          </Router>
        </StyledEngineProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
