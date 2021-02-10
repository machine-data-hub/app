import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Collapse,
  Container,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import Card from "./Card";
import Dataset from "./datasets.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  relative: {
    position: "relative",
    "& .MuiInputBase-colorPrimary": {
      padding: "14px",
    },
  },
  absolute: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 20,
    right: 0,
    width: "60%",
    paddingTop: 10,
    boxShadow:
      "-webkit-box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);-moz-box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);",
    zIndex: 1000,
  },
  margin: {
    "& .MuiButton-outlinedPrimary": {
      marginLeft: 7,
      marginRight: 7,
    },
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [state, setstate] = React.useState(Dataset);
  const [filter, setFilter] = React.useState({
    sort: "asc",
  });

  const onChange = (e) => {
    const map = Dataset.filter((v, i) => {
      return v.Name.toLocaleLowerCase().includes(e.target.value.toLowerCase());
    });
    setstate(map);
  };
  function ASC(a, b) {
    if (a.Name < b.Name) {
      return -1;
    }
    if (a.Name > b.Name) {
      return 1;
    }
    return 0;
  }
  function DES(a, b) {
    if (a.Name > b.Name) {
      return -1;
    }
    if (a.Name < b.Name) {
      return 1;
    }
    return 0;
  }
  const onClickSort = (prop) => () => {
    setFilter({ ...filter, sort: prop });
    const sorted = prop === "asc" ? state.sort(ASC) : state.sort(DES);
    setstate(sorted);
  };
  console.log(state);
  return (
    <div className={classes.root}>
      <Box py={15}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Box className={classes.relative}>
              <TextField
                fullWidth
                id="outlined-textarea"
                placeholder="Enter dataset"
                multiline
                onChange={onChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClick}
                        aria-label="delete"
                        className={classes.margin}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Collapse in={open} timeout={1} unmountOnExit>
                <Box className={classes.absolute}>
                  <Typography variant="h6" className={classes.title}>
                    Sort by
                  </Typography>
                  <Box className={classes.margin} pt={1}>
                    <Button
                      variant={
                        filter.sort === "data_added" ? "contained" : "outlined"
                      }
                      onClick={onClickSort("data_added")}
                      size="small"
                      color="primary"
                    >
                      Data added
                    </Button>
                    <Button
                      variant={
                        filter.sort === "most_popular"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={onClickSort("most_popular")}
                      size="small"
                      color="primary"
                    >
                      Most popular
                    </Button>
                    <Button
                      variant={filter.sort === "asc" ? "contained" : "outlined"}
                      onClick={onClickSort("asc")}
                      size="small"
                      color="primary"
                    >
                      A to Z
                    </Button>
                    <Button
                      variant={filter.sort === "des" ? "contained" : "outlined"}
                      onClick={onClickSort("des")}
                      size="small"
                      color="primary"
                    >
                      Z to A
                    </Button>
                  </Box>
                  <Box pt={2} />
                  <Typography variant="h6" className={classes.title}>
                    Sector
                  </Typography>
                  <Box className={classes.margin} pt={1}>
                    <Button variant="outlined" size="small" color="primary">
                      Automotive
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Chemical
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Steel
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Semicon
                    </Button>
                    <Box pt={1} />
                    <Button variant="outlined" size="small" color="primary">
                      Power
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Battery
                    </Button>
                  </Box>
                  <Box pt={2} />
                  <Typography variant="h6" className={classes.title}>
                    ML Type
                  </Typography>
                  <Box className={classes.margin} pt={1}>
                    <Button variant="outlined" size="small" color="primary">
                      Regression
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Classification
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Kalman filtering
                    </Button>
                    <Box pt={1} />
                    <Button variant="outlined" size="small" color="primary">
                      Neural Networks
                    </Button>
                  </Box>
                  <Box pt={2} />
                  <Typography variant="h6" className={classes.title}>
                    Labeled
                  </Typography>
                  <Box className={classes.margin} pt={1}>
                    <Button variant="outlined" size="small" color="primary">
                      Labeled
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                      Not Labeled
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>

      {/* img slider */}

      <Container>
        <Grid container spacing={3}>
          {state.map((v, i) => (
            <Grid key={v.id} item xs={3}>
              <Card data={v} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box py={5} />
    </div>
  );
}
