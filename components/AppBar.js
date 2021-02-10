import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    paddingTop: 20,
    fontSize: "72px!important",
  },
  text: {
    textDecoration: "none",
    color: "white",
  },
  align: {
    alignItems: "baseline!important",
  },
  menus: {
    "& Button": {
      fontSize: "28px",
      marginLeft: 10,
      marginRight: 10,
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.align}>
          <Typography variant="h2" className={classes.title}>
            <Link href="/">
              <a className={classes.text}>PHM DATA HUB</a>
            </Link>
          </Typography>
          <div className={classes.menus}>
            <Button color="inherit">
              <Link href="/">
                <a className={classes.text}>HOME</a>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/about">
                <a className={classes.text}>ABOUT</a>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="#">
                <a className={classes.text}>SUGGEST A DATA</a>
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
