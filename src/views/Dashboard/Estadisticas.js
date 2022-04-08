import React from "react";
// react plugin for creating charts
import makeStyles from '@mui/styles/makeStyles';

// @mui/icons-material  info_outline
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Store from "@mui/icons-material/Store";
import Update from "@mui/icons-material/Update";
import Accessibility from "@mui/icons-material/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ContentCopy/>
              </CardIcon>
              <p className={classes.cardCategory}>Niveles</p>
              <h3 className={classes.cardTitle}>
                4
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Etapas</p>
              <h3 className={classes.cardTitle}>4</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <InfoOutlined/>
              </CardIcon>
              <p className={classes.cardCategory}>Tutores</p>
              <h3 className={classes.cardTitle}>5</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Estudiantes</p>
              <h3 className={classes.cardTitle}>20</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Recién actualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
