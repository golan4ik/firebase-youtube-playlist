import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    paddingLeft: theme.spacing(1),
  },
  search: {
    flex: 1,
  },
}));

function Input(props) {
  const { onAdd, error, disable, savingData } = props;
  const [value, setValue] = useState("");
  const prevIsSavingData = useRef(savingData);
  const classes = useStyles();

  useEffect(() => {
    /**
     * Should've use custom hook to track 'previous state
     */
    if (prevIsSavingData.current && !savingData && !error) {
      setValue("");
    }
  }, [savingData, setValue, error]);

  useEffect(() => {
    prevIsSavingData.current = savingData;
  }, [savingData]);

  return (
    <Grid container item xs={12} alignItems="center" className={classes.root}>
      <TextField
        className={classes.search}
        id="link-input"
        label="URL or Video ID"
        disabled={disable}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") onAdd(value);
        }}
        error={error?.length > 0}
        helperText={error ? error : ""}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          onAdd(value);
        }}
        disabled={value.length < 11 || disable}
      >
        Add
      </Button>
    </Grid>
  );
}

export default Input;
Input.defaultProps = {
  onAdd: () => {},
};
Input.propTypes = {
  onAdd: PropTypes.func,
  error: PropTypes.string,
  savingData: PropTypes.bool,
};
