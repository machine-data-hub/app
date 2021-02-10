import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Box, Grid, Button, CardContent, CardMedia, Card} from "@material-ui/core/";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    "& .download-btn": {
      "& .MuiButton-label": {
        fontSize: 9,
        textTransform: "capitalize",
      },
    },
    "& .tags span": {
      margin: "0 3px",
    },
    "& .heading": {
      textAlign: "center",
      height: 100,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  spanmargin: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 13,
  },
  fontsize: {
    fontSize: 13,
  },
  btnsize: {
    "& .MuiButtonBase-root": {
      fontSize: 11,
      color: "#3c7fb3",
    },
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
      margin: "2px 4px",
    },
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/image/laptop1.jpg"
        title={props.data.Name}
      />
      <CardContent>
        <Typography
          className="heading"
          gutterBottom
          variant="h6"
          component="h3"
        >
          {props.data.Name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Box textAlign="center" className="tags" fontSize={10}>
            <span>{props.data.FileSize}</span>{" "}
            <span>{props.data.Attributes} Atributes</span>{" "}
            <span>{props.data.Instances} Instances</span>
          </Box>
        </Typography>
      </CardContent>
      <Box backgroundColor="#e7f3ff" py={1}>
        <Grid container>
          <Grid item xs={6}>
            <Button
              size="small"
              color="secondary"
              fullWidth
              className="download-btn"
              href={props.data.DownloadLink}
              startIcon={<GetAppIcon />}
            >
              {props.data.Downloads} Downloads
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              size="small"
              color="secondary"
              fullWidth
              className="download-btn"
              startIcon={<FavoriteIcon />}
            >
              {props.data.Likes === ""
                ? "No likes"
                : props.data.likes + " " + "Likes"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.btnGroup}>
        <Button size="small" color="primary" variant="contained">
          Chemical
        </Button>
        <Button size="small" color="primary" variant="contained">
          Chemical
        </Button>
        <Button size="small" color="primary" variant="contained">
          Chemical
        </Button>
        <Button size="small" color="primary" variant="contained">
          Chemical
        </Button>
        <Button size="small" color="primary" variant="contained">
          Chemical
        </Button>
      </div>
      <Box textAlign="right">
        <Button
          onClick={() =>
            router.push({
              pathname: "/posts/post",
              search: "id=" + props.data.id,
            })
          }
          size="small"
        >
          See more!
        </Button>
      </Box>
    </Card>
  );
}
