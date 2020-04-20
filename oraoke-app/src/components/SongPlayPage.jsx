import React, { useEffect } from "react";
import classes from "./stylesheet/SongPlayPageContainer.module.scss";
import { bgShape } from "./common/commonFunctions";
import { NavLink } from "react-router-dom";
import oraokeLogo from "../img/ОраокеLogo.png";
import AdvertismentBlock from "./common/AdvertismentBlock";
import ButtonSmall from "./common/ButtonSmall";
import Canvas1Leps from "./Canvas1Leps";
import birdRight from "../img/BirdTransparent.gif";

const SongPlayPage = React.memo((props) => {
  let isSongPlaying = props.isCurrentSongPlaying; //from useState SPContainer
  let timer = props.songMP3 ? props.songMP3.currentTime : 0;
  let xCoordinata =
    props.xCoordOfBird && props.xCoordOfBird < 20
      ? 640 - props.xCoordOfBird
      : 200; // соордината птицы в 200px от левого края

  return (
    <div className={classes.PageContainer}>
      <div style={bgShape}></div>
      <div className={classes.globalBacGround}></div>
      <div className={classes.PageWrp}>
        {/* left advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock adv={props.adv7} />
          <AdvertismentBlock adv={props.adv8} />
        </div>
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={"Logo"} />
            </div>
            <div>
              <p>{props.currentSong.fullTitle}</p>
            </div>
          </div>
          <Canvas1Leps
            canvasRefGetter={props.canvasRefGetter}
            canvasWrpRefGetter={props.canvasWrpRefGetter}
            songMP3RefGetter={props.songMP3RefGetter}
            textWrpRefGetter={props.textWrpRefGetter}
            song={props.currentSong}
          />
          {/* Потом автоматизировать выбор песни */}
          {isSongPlaying ? (
            <div
              className={classes.btnWrp}
              id={classes.btnWrpStop}
              onClick={() => {
                // props.stopSigningAndMoving(props.timerId);
                props.stopBtnIsPushSet(true);
              }}
            >
              <div>{`Время: ${timer}____X: ${xCoordinata}_____`}</div>
              <ButtonSmall btnNumber="1" btnText="СТОП" />
            </div>
          ) : (
            <div
              onClick={() => {
                props.stopBtnIsPushSet(false);
                props.startSigningAndMoving(props.currentSong.startMovingDelay);
              }}
              className={classes.btnWrp}
              id={classes.btnWrpPlay}
            >
              <div>{`Время: ${timer}____X: ${xCoordinata}_____`}</div>
              <ButtonSmall btnNumber="1" btnText="СТАРТ" />
            </div>
          )}
        </div>
        <div
          id="mainMenu"
          onClick={() => {
            props.stopSigningAndMoving();
          }}
          className={classes.toMainMenu}
        >
          <NavLink to={"/start-page"}>
            <span>Главное меню</span>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span>рус</span>
          <span>|</span>
          <span>eng</span>
        </div>
        {/*птица*/}
        <div className={classes.birdMainWrp}>
          <div id='bird' className={classes.birdWrp}>
            <img src={birdRight} alt="bird"/>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SongPlayPage;
