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
                About this Dataset
              </Typography>
              <Typography className={classes.fontsize}>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </Typography>
              <Typography className={classes.fontsize}>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
