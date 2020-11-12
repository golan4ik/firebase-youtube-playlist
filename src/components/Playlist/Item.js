import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    cursor: "pointer",
    width: "100%",
    justifyContent: "space-around",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    paddingTop: "0",
  },
  cover: {
    width: 120,
    height: 90,
    backgroundSize: "contain",
  },
  selected: {
    outline: "1px solid rgba(253, 227, 167, 1)",
    boxShadow: "0px 0px 10px 0px rgba(253, 227, 167, 1)",
    backgroundColor: "rgba(253, 227, 167, .4)",
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { item, selected, onDeleteClick } = props;

  return (
    <ListItem
      dense={true}
      divider={true}
      className={`${selected ? classes.selected : ""}`}
    >
      <div className={classes.root}>
        <CardMedia className={classes.cover} image={item.thumbnail.url} />
        <CardContent className={classes.content}>
          <Typography component="b" variant="caption">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.channelTitle}
          </Typography>
          <Typography component="b" variant="subtitle2" color="textSecondary">
            {item.duration}
          </Typography>
        </CardContent>
        <CardContent>
          <IconButton aria-label="delete" onClick={onDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </div>
    </ListItem>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteClick: PropTypes.func,
};
