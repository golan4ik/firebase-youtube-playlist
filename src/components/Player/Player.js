import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import "./styles.css";

function Player(props) {
  const { videoId, onVideoEnded } = props;
  const player = useRef(null);
  
  useEffect(() => {
    if (videoId && player.current) {
      /**
       * For some reason doesn't play on component's load, but works after snapshot update
       * TODO: check WTF
       */
      player.current.playVideo();
    }
  }, [videoId, player]);

  useEffect(() => {
    return () => {
      player.current = null;
    };
  }, []);

  const onReady = (e) => {
    player.current = e.target;
  };

  const onEnd = () => {
    onVideoEnded();
  };

  const onStateChange = (e) => {
    //console.log("State: ", e.data);
  };

  const onError = (error) => {
    console.log(error);
  };

  const options = {
    height: "280",
    width: "480",
    playerVars: {
      autoplay: 1,
      loop: 1,
      start: 0,
      origin:
        process.env.NODE_ENV !== "development"
          ? process.env.REACT_APP_FB_DATABASE_URL
          : "http://localhost:3000",
      enablejsapi: 1,
    },
  };

  return (
    <div className="player-wrapper">
      {
        /**
         * Tried to play with just visibility while solving the TODO described above(not playing on mount).
         * It was {videoId ? <YouTube ...lalala /> : <div className="placeholder"></div>} before
         */
      }
      <YouTube
        className={`${!videoId ? "hidden" : ""}`}
        videoId={videoId}
        opts={options}
        onReady={onReady}
        id={"youtube-player"}
        onEnd={onEnd}
        onError={onError}
        onStateChange={onStateChange}
      />
      <div className={`placeholder ${videoId ? "hidden" : ""} `}>
        <h3>Nothing to play</h3>
      </div>
    </div>
  );
}

export default Player;

Player.propTypes = {
  videoId: PropTypes.string,
  onVideoEnded: PropTypes.func,
};
