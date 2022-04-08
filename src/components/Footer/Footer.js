/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          Haz que tus sueños se realicen!!!
        </div>
        <p className={classes.right}>
          <span>
          Copyright &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.creative-tim.com?ref=mdr-footer"
              target="_blank"
              className={classes.a}
            >
              Obi
            </a>
            , Vicovillca
          </span>
        </p>
      </div>
    </footer>
  );
}
