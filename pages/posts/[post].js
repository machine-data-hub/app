import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../../components/AppBar";
import {
  Box,
  Grid,
  Container,
  Card,
  Typography,
  CardMedia,
  Button,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Cardcomp from "../../components/Card";
import Datasets from "../../components/datasets.json";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .tags span": {
      margin: "0 10px",
      fontSize: "12px",
    },
    "& .download-btn": {
      fontSize: "10px",
    },
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
  },
  wrapper: {
    position: "relative",
  },
  headingname: {
    position: "absolute",
    top: "45%",
    right: "30%",
    color: "white!important",
  },
  textcolor: {
    color: "#3c7fb3!important",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  btnGroup: {
    padding: 10,
    "& button": {
      fontSize: 10,
      textTransform: "capitalize",
      margin: "4px 2px",
    },
  },
  fontsize: {
    fontSize: "12px!important",
    paddingTop: "15px",
    color: "#3c7fb3!important",
    fontWeight: "600!important",
  },
  marginminus: {
    margin: "0 -40px",
  },
  border: {
    border: "1px solid #eeeeee",
    boxShadow:
      "-webkit-box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);-moz-box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);box-shadow: 0px 7px 5px 0px rgba(238,238,238,1);!important",
  },
  colorblack: {
    color: "black",
  },
}));

export default function ItemDetail() {
  const [state, setstate] = React.useState(null);

  const router = useRouter();
  const { post } = router.query;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    const filtered = Datasets.filter((v) => {
      return v.id === router.query.id;
    });
    setstate(filtered[0]);
  }, []);
  console.log(state);
  return (
    <div className={classes.root}>
      <AppBar />

      <Box py={15}>
        <Grid container>
          <Grid item xs={8}>
            <Container fixed>
              <Card className={classes.root}>
                <div className={classes.wrapper}>
                  <CardMedia
                    className={classes.media}
                    image="/image/laptop1.jpg"
                    title="Paella dish"
                  />
                  <Typography variant="h5" className={classes.headingname}>
                    {state && state.Name}
                  </Typography>
                </div>
                <Grid container>
                  <Grid item xs={5}>
                    <Box pt={3} backgroundColor="#e7f3ff">
                      <Container fixed>
                        <Box py={2}>
                          <Typography className={classes.textcolor}>
                            Owner: {state && state.Owner}
                          </Typography>
                          <Typography className={classes.textcolor}>
                            Donated: January 20,2020
                          </Typography>
                        </Box>
                        <Box
                          textAlign="center"
                          className="tags"
                          fontSize={10}
                          pb={2}
                        >
                          <span>{state && state.FileSize}</span>{" "}
                          <span>{state && state.Attributes} Atributes</span>{" "}
                          <span>{state && state.Instances} Instances</span>
                        </Box>

                        <Grid container>
                          <Grid item xs={6} p={0}>
                            <Button
                              size="small"
                              color="secondary"
                              fullWidth
                              className="download-btn"
                              href={state && state.DownloadLink}
                              startIcon={<GetAppIcon />}
                            >
                              {state && state.Downloads} Downloads
                            </Button>
                          </Grid>
                          <Grid item xs={6} p={0}>
                            <Button
                              size="small"
                              color="secondary"
                              fullWidth
                              className="download-btn"
                              startIcon={<FavoriteIcon />}
                            >
                              {state && state.Likes}
                            </Button>
                          </Grid>

                          <div className={classes.btnGroup}>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              {state &&
                                state[
                                  "Sector\n(Semicon/Chemical/Power/Automotive/Mechanical/Steel/Battery/Etc)"
                                ]}
                            </Button>
                            {/* <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button> */}
                          </div>
                          <Box pt={3}>
                            <Typography>More Info:</Typography>
                            <Typography>
                              <a className={classes.colorblack} href="/">
                                {" "}
                                {state &&
                                  state[
                                    "Web Page (for reference, not metadata)"
                                  ]}{" "}
                              </a>
                            </Typography>
                            <Box pb={3} />
                          </Box>
                        </Grid>
                      </Container>
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Container fixed>
                      <Box pt={5}>
                        <Typography variant="h4" className={classes.textcolor}>
                          About this Dataset
                        </Typography>
                        <Typography className={classes.fontsize}>
                          {state && state["Short Summary"]}
                        </Typography>
                        <Box textAlign="center" pt={3}>
                          <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            href={state && state.DownloadLink}
                          >
                            Download
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={4}>
            {Datasets.slice(0, 2).map((v, i) => (
              <Box key={v.id} mb={3}>
                <Cardcomp data={v} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
