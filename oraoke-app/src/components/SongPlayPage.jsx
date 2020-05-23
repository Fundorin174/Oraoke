import React, { useEffect } from "react";
import classes from "./stylesheet/SongPlayPageContainer.module.scss";
import { bgShape } from "./common/commonFunctions";
import { NavLink } from "react-router-dom";
import oraokeLogo from "../img/ОраокеLogo.png";
import AdvertismentBlock from "./common/AdvertismentBlock";
import ButtonSmall from "./common/ButtonSmall";
import Canvas from "./Canvas";

const SongPlayPage = React.memo((props) => {
  let isSongPlaying = props.isCurrentSongPlaying; //from useState SPContainer
  let timer = props.songMP3 ? props.songMP3.currentTime : 0;
  let xCoordinata = props.xCoordOfBird ? props.xCoordOfBird : 150; // соордината птицы в 200px от левого края

  let texts;
  //тексты на разных языках
  switch (props.currentLanguage) {
    case "ru":
      texts = {
        volumeText: "Громкость",
        musicText: "Музыка",
        voiceText: "Голос",
        mainMenuText: "Главное меню",
        buttonStopText: "СТОП",
        buttonStartText: "СТАРТ",
      };
      break;
    case "en":
      texts = {
        volumeText: "Volume",
        musicText: "Music",
        voiceText: "Voice",
        mainMenuText: "Main menu",
        buttonStopText: "STOP",
        buttonStartText: "START",
      };
      break;
    default:
      return null;
  }
  return (
    <div className={classes.PageContainer}>
      <div style={bgShape} />
      <div className={classes.globalBacGround} />
      <div className={classes.PageWrp}>
        {/* left advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock
            adv={props.adv7}
            currentLanguage={props.currentLanguage}
          />
          <AdvertismentBlock
            adv={props.adv8}
            currentLanguage={props.currentLanguage}
          />
        </div>
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={"Logo"} />
            </div>
            <div>
              <p>{props.currentSong.fullTitle[props.currentLanguage]}</p>
            </div>
          </div>
          <Canvas
            canvasRefGetter={props.canvasRefGetter}
            canvasWrpRefGetter={props.canvasWrpRefGetter}
            songMP3RefGetter={props.songMP3RefGetter}
            textWrpRefGetter={props.textWrpRefGetter}
            birdRefGetter={props.birdRefGetter}
            song={props.currentSong}
            canvasWrpHeight={props.canvasWrpHeight}
          />
          <div className={classes.buttonAndVolumeWrp}>
            <fieldset className={classes.volumeControlWrp}>
              <legend>{texts.volumeText}</legend>
              <label>
                {texts.musicText}:
                <input
                  ref={props.songVolumeInputRefGetter}
                  type="range"
                  max="1"
                  min="0"
                  step="0.1"
                  value={props.currentSongVolume}
                  onChange={(value) => props.changeVolumeOfSong(value)}
                />
              </label>
              <label>
                {texts.voiceText}:
                <input
                  ref={props.voiceVolumeInputRefGetter}
                  type="range"
                  max="4"
                  min="0"
                  step="0.1"
                  value={props.currentVoiceVolume}
                  onChange={(value) => props.changeVolumeOfVoice(value)}
                />
              </label>
            </fieldset>
            {isSongPlaying ? (
              <div
                className={classes.btnWrp}
                id={classes.btnWrpStop}
                onClick={() => {
                  props.stopBtnIsPushSet(true);
                }}
              >
                {!props.isSetMaxUserVoiceLevel && (
                  <p className={classes.warning}>
                    Вы не откалибровали микрофон!
                  </p>
                )}
                <ButtonSmall btnNumber="1" btnText={texts.buttonStopText} />
                <div>{`X: ${xCoordinata}_____`}</div>
              </div>
            ) : (
              <div
                onClick={() => {
                  props.stopBtnIsPushSet(false);
                  props.startSigningAndMoving(
                    props.currentSong.startMovingDelay
                  );
                }}
                className={classes.btnWrp}
                id={classes.btnWrpPlay}
              >
                <ButtonSmall btnNumber="1" btnText={texts.buttonStartText} />
                <div>{`Время: ${timer}____X: ${xCoordinata}_____`}</div>
              </div>
            )}
          </div>
        </div>
        <div
          id="mainMenu"
          onClick={() => {
            props.stopSigningAndMoving();
          }}
          className={classes.toMainMenu}
        >
          <NavLink to={"/start-page"}>
            <span>{texts.mainMenuText}</span>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span onClick={() => props.currentLanguageToggle("ru")}>рус</span>
          <span>|</span>
          <span onClick={() => props.currentLanguageToggle("en")}>eng</span>
          {/*аудиофайлы невидимые*/}
          <span>
            <audio
              ref={props.soundExploisionRefGetter}
              id="soundExploision"
              src={props.srcToSoundExploision}
            />
            <audio
              ref={props.soundOfFinishRefGetter}
              id="soundOfFinish"
              src={props.srcToSoundOfFinish}
            />
          </span>
        </div>
      </div>
    </div>
  );
});

export default SongPlayPage;
