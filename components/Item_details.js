import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import {
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .tags span": {
      margin: "0 10px",
      fontSize: "12px",
    },
    "& .download-btn": {
      fontSize: "12px",
    },
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <AppBar />

      <Box py={15}>
        <Grid container>
          <Grid item xs={8}>
            <Container fixed>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image="/image/laptop1.jpg"
                  title="Paella dish"
                />
                <Grid container>
                  <Grid item xs={5}>
                    <Box pt={3} backgroundColor="#e7f3ff">
                      <Container fixed>
                        <Box py={2}>
                          <Typography className={classes.textcolor}>
                            Dataset from NASA
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
                          <span>50 MB</span> <span>1234 Atributes</span>{" "}
                          <span>4321 Instances</span>
                        </Box>

                        <Grid container>
                          <Grid item xs={6} p={0}>
                            <Button
                              size="small"
                              color="secondary"
                              fullWidth
                              className="download-btn"
                              href="/about"
                              startIcon={<GetAppIcon />}
                            >
                              875 Downloads
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
                              800
                            </Button>
                          </Grid>

                          <div className={classes.btnGroup}>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button>
                            <Button
                              size="medium"
                              color="primary"
                              variant="contained"
                            >
                              Chemical
                            </Button>
                          </div>
                          <Box pt={3}>
                            <Typography>More Info:</Typography>
                            <Typography>
                              <a className={classes.colorblack} href="#">
                                {" "}
                                www.website.com{" "}
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
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for 'lorem ipsum' will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like).
                        </Typography>
                        <Box textAlign="center" pt={3}>
                          <Button
                            size="medium"
                            color="primary"
                            variant="contained"
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
            <Container fixed>
              <Box textAlign="center">
                <Typography variant="h4">About this Dataset</Typography>
              </Box>

              <Box className={classes.border} mt={2} p={2}>
                <Container fixed>
                  <Box>
                    <Typography variant="h6">Prognostics Dataset 4</Typography>
                  </Box>
                  <Box textAlign="center" className="tags" fontSize={10} py={1}>
                    <span>50 MB</span> <span>1234 Atributes</span>{" "}
                    <span>4321 Instances</span>
                  </Box>
                  <Box backgroundColor="#e7f3ff" py={1}>
                    <Grid container>
                      <Grid item xs={6} p={0}>
                        <Button
                          size="small"
                          color="secondary"
                          fullWidth
                          className="download-btn"
                          href="/about"
                          startIcon={<GetAppIcon />}
                        >
                          875 Downloads
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
                          800
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <div className={classes.btnGroup}>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                  </div>
                  <Box textAlign="right">
                    <Typography className={classes.textcolor}>
                      See More!
                    </Typography>
                  </Box>
                </Container>
              </Box>
              <Box className={classes.border} mt={2} p={2}>
                <Container fixed>
                  <Box>
                    <Typography variant="h6">Prognostics Dataset 4</Typography>
                  </Box>
                  <Box textAlign="center" className="tags" fontSize={10} py={1}>
                    <span>50 MB</span> <span>1234 Atributes</span>{" "}
                    <span>4321 Instances</span>
                  </Box>
                  <Box backgroundColor="#e7f3ff" py={1}>
                    <Grid container>
                      <Grid item xs={6} p={0}>
                        <Button
                          size="small"
                          color="secondary"
                          fullWidth
                          className="download-btn"
                          href="/about"
                          startIcon={<GetAppIcon />}
                        >
                          875 Downloads
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
                          800
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <div className={classes.btnGroup}>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                    <Button size="medium" color="primary" variant="contained">
                      Chemical
                    </Button>
                  </div>
                  <Box textAlign="right">
                    <Typography className={classes.textcolor}>
                      See More!
                    </Typography>
                  </Box>
                </Container>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
