import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Player from "./components/Player/Player";
import Playlist from "./components/Playlist/Playlist";
import db from "./fbConfig";
import {
  onSaveStart,
  onVideoEnd,
  setError,
  setItems,
  setSelected,
} from "./store/actions";
import {
  getError,
  getIsSavingData,
  getItems,
  getSelectedItem,
} from "./store/selectors";
import { parseSnapshot, sortItemsByDate } from "./utils";

function App(props) {
  const {
    items,
    setItems,
    setSelectedItem,
    selectedItem,
    saveData,
    savingData,
    error,
    onVideoEndAction,
  } = props;

  //console.log(selectedItem);

  useEffect(() => {
    const unsubscribe = db.collection("playlist").onSnapshot(onSnapshot);

    /**
     * Cleanup
     */
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const itemsArray = Object.values(items || {});
    if (!selectedItem && itemsArray.length > 0) {
      const oldestItem = sortItemsByDate(itemsArray).shift() || null;

      setSelectedItem(oldestItem);
    }
  }, [items, selectedItem, setSelectedItem]);

  const onSnapshot = (snapshot) => {
    const docs = parseSnapshot(snapshot);

    setItems(docs);
  };

  const onAddLink = (str) => {
    saveData(str);
  };

  const onDeleteClick = () => {
    onVideoEndAction();
  };

  const onVideoEnded = () => {
    onVideoEndAction();
  };

  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid container item md={5}>
          <Playlist
            items={Object.values(items)}
            selectedItemId={selectedItem?.id}
            onAdd={onAddLink}
            disable={savingData}
            savingData={savingData}
            error={error}
            onDeleteClick={onDeleteClick}
          />
        </Grid>
        <Grid container item md={7} justify="center">
          <Player videoId={selectedItem?.videoId} onVideoEnded={onVideoEnded} />
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    items: getItems(state),
    selectedItem: getSelectedItem(state),
    error: getError(state),
    savingData: getIsSavingData(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (items) => dispatch(setItems(items)),
    setSelectedItem: (item) => dispatch(setSelected(item)),
    saveData: (text) => dispatch(onSaveStart(text)),
    setError: (text) => dispatch(setError(text)),
    onVideoEndAction: () => dispatch(onVideoEnd()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
