import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import "./styles.css";
import Input from "../Input/Input";
import Item from "./Item";
import { sortItemsByDate } from "../../utils";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexWrap: "nowrap",
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    flex: 0,
  },
  list: {
    overflowY: "auto",
    flex: 1,
  },
}));

function Playlist(props) {
  const classes = useStyles();
  const {
    items,
    onSelect,
    savingData,
    onAdd,
    onDeleteClick,
    selectedItemId,
    disable,
    error,
  } = props;

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container item xs={12} className={classes.search}>
        <Input
          onAdd={onAdd}
          disable={disable}
          error={error}
          savingData={savingData}
        />
      </Grid>
      <Grid container item xs={12} className={classes.list}>
        <List component="nav" aria-label="videos">
          {sortItemsByDate(items).map((item) => {
            return (
              <Item
                selected={selectedItemId === item.id}
                item={item}
                onClick={() => onSelect(item)}
                key={item.id}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}

export default Playlist;
Playlist.defaultProps = {
  items: [],
  onSelect: () => {},
  onAdd: () => {},
  onDeleteClick: () => {},
  savingData: false,
  error: "",
};
Playlist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
  selectedItemId: PropTypes.string,
  savingData: PropTypes.bool,
  error: PropTypes.string,
  onDeleteClick: PropTypes.func,
};
