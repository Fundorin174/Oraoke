import React from "react";
import classes from "./stylesheet/SongPlayPageContainer.module.scss";
import birdRight from "../img/BirdTransparent.gif";

const Canvas = React.memo((props) => {
  return (
    <div
      ref={props.canvasWrpRefGetter}
      id="canvasWrp"
      className={classes.canvasWrp}
    >
      {/*Поле*/}
      <canvas
        ref={props.canvasRefGetter}
        id="canvas"
        className={classes.canvas}
        width={props.song.canvasWigth}
      />

      {/*птица*/}
      <div className={classes.birdMainWrp} ref={props.birdRefGetter}>
        <div id="bird" className={classes.birdWrp}>
          <img src={birdRight} alt="bird" />
        </div>
      </div>

      {/*текст*/}
      <div
        ref={props.textWrpRefGetter}
        id="textWrp"
        className={classes.textWrp}
      >
        <pre>{props.song.songText}</pre>
      </div>

      {/*невидимая песня*/}
      <div className={classes.song}>
        <span>
          <audio
            ref={props.songMP3RefGetter}
            id="audioMP3"
            src={props.song.srcToSong}
          />
        </span>
      </div>
    </div>
  );
});

export default Canvas;
