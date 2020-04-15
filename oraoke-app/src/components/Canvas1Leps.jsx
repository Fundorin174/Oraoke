import React from "react";
import classes from "./stylesheet/SongPlayPageContainer.module.scss";

const Canvas1Leps = React.memo((props) => {
  return (
    <div id="canvasWrp" className={classes.canvasWrp}>
      <canvas
        id="canvas"
        className={classes.canvas}
        width={props.song.canvasWigth}
      ></canvas>
      <div id="textWrp" className={classes.textWrp}>
        <pre>{props.song.songText}</pre>
      </div>
      <div className={classes.song}>
        <span>
          <audio id="audioMP3" src={props.song.srcToSong}></audio>
        </span>
      </div>
    </div>
  );
});

export default Canvas1Leps;
