import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import { Box, Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fontsize: {
    fontSize: "12px!important",
    paddingTop: "15px",
    color: "#3c7fb3!important",
    fontWeight: "600!important",
  },
  textcolor: {
    color: "#3c7fb3!important",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar />
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box p={5}>
              <Typography variant="h4" className={classes.textcolor}>
                Recommend a Dataset!
              </Typography>
              <Typography className={classes.fontsize}>
                <input type="text" placeholder="Title"></input>
                <input type="text" placeholder="URL"></input>
                <input type="text" placeholder="Comment"></input>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
