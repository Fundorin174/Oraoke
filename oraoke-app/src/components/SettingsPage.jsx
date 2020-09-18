import React from "react";
import oraokeLogo from "./../img/ОраокеLogo.png";
import classes from "./stylesheet/SettingsPageContainer.module.scss";
import Button from "./common/Button";
import { NavLink } from "react-router-dom";
import birdLeft from "./../img/BirdTransparentLeft.gif";
import { useEffect } from "react";
import { bgShape } from "./common/commonFunctions";
import AdvertismentBlock from "./common/AdvertismentBlock";

window.webkitAudioContext = undefined;
const SettingsPage = React.memo((props) => {
  let num = 32, //the number of elements in the array to record audio from the microphone
    array,
    context,
    bird,
    birdHeigth,
    analyser,
    src,
    maxHeightForWile = 255;
//texts in different languages
    let texts = props.languagesJSONData[props.currentLanguage].settingsPageTexts;
  
  

  //////////////////////////////////////////////////////////////////////////////////
  //Function of lifting the bird depending on the sound from the microphone
  let onStartCheckingMicrophone = () => {
    let scaleItems = document.getElementsByClassName(
      "linesItem"
    );
    props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
    //sound animation
    array = new Uint8Array(num);
    if (context) {
      return;
    }
    bird = document.getElementById("bird");
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    //get the stream from the microphone and work with it
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        analyser.connect(context.destination); //output audio to speakers

        // loop(); a recursive function that processes audio from the microphone
        let loop = setTimeout(function moveBird() {
          let lineHeight = document.getElementById("linesTable").clientHeight; //scale height

          birdHeigth = bird.clientHeight; //birds height

          analyser.getByteFrequencyData(array); //getting frequency data

          // getting the average signal level in the array (from the microphone)
          let averageHeight =
            array.reduce((summ, current) => summ + current) / array.length;

          // Setting the height of the bird's rise from the average signal level in the array
          let birdFlyingHidh =
            (averageHeight * lineHeight) / maxHeightForWile > 0 &&
            (averageHeight * lineHeight) / maxHeightForWile - birdHeigth <
              lineHeight
              ? (averageHeight * lineHeight) / maxHeightForWile + "px"
              : (averageHeight * lineHeight) / maxHeightForWile > 0 &&
                (averageHeight * lineHeight) / maxHeightForWile - birdHeigth >
                  lineHeight
              ? lineHeight - birdHeigth + "px"
              : 0 + "px";

          //changing marging - and fly))
          bird.style.marginBottom = birdFlyingHidh;

          // the value of the bird's rise as a number (without .px)
          let birdFlyingHidhLikeNum = birdFlyingHidh.slice(0, -2); //remove 'px' from end

          // Dynamic colorization of sections on the scale
          for (let i = 0; i < scaleItems.length; i++) {
            if (i < +birdFlyingHidhLikeNum / 20) {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor =
                "rgba(255, 29, 190, 0.8)";
            } else {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor = "";
            }
          }

          //Save the maximum voice value in state
          if (averageHeight > 190) {
            props.isSetMaxUserVoiceLevelSuccsess(true); //успешная калибровка
            if (averageHeight > props.maxUserVoiceLevel) {
              props.setMaxUserVoiceLevel(averageHeight);
            }
          }

          loop = setTimeout(moveBird, 30); // recursion
        }, 30);

        ////////////////////////////////////////////////////////////////////////////////
        // eventListener on Stop button + bird go down + disconect dinamics + clear Bgnd
        // of scaleItems
        let stopBtn = document.getElementById("StopBtn");
        stopBtn.addEventListener("click", () => {
          stopBirdFliying(loop, bird, analyser, scaleItems);
        });

        // eventListener on "to song" button + bird go down + disconect dinamics + clear Bgnd
        // of scaleItems
        let toSongsBtn = document.getElementById("toSongsBtn");
        toSongsBtn.addEventListener("click", () => {
          stopBirdFliying(loop, bird, analyser, scaleItems);
        });
        // eventListener on "to  mein menu" button + bird go down + disconect dinamics + clear Bgnd
        // of scaleItems
        let mainMenu = document.getElementById("toMainMenu");
        mainMenu.addEventListener("click", () => {
          stopBirdFliying(loop, bird, analyser, scaleItems);
        });
      })
      .catch((error) => {
        alert(
          // eslint-disable-next-line no-useless-escape
          error + "\r\n Отклонено. Перезагрузите страницу!"
        );
      });
  };
  /////////////////////////////////////////////////////////////////
  //Stopping everything. capture sound, bird flight, and paint over blocks
  let stopBirdFliying = (loop, bird, analyser, scaleItems) => {
    clearTimeout(loop);
    bird.style.marginBottom = 0 + "px";
    analyser.disconnect();
    for (let i = 0; i < scaleItems.length; i++) {
      scaleItems[i].style.backgroundColor = "";
    }
  };

  // stop microphone calibration
  let onFinishCheckingMicrophone = () => {
    props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
  };

  //calibration is started, but the maximum voice value is not set
  let pushStartNotScreamed =
    props.isCheckingMicrophoneStart && !props.isSetMaxUserVoiceLevel;

  // the appearance of the exit button when calibration is successful
  let toSongBtnClassNames = `${classes.btnsWrp} ${
    props.isSetMaxUserVoiceLevel ? classes.visible : classes.unvisible
  }`;

  //////////////////////////////////////////////////////////////////
  // Displaying the start or stop button
  let startOrStopButton = () => {
    return !props.isCheckingMicrophoneStart ? (
      <div
        className={classes.btnsWrp}
        onClick={() => {
          onStartCheckingMicrophone();
        }}
      >
        <Button btnText={texts.buttonStartText} btnNumber="1" />
      </div>
    ) : (
      <div
        id="StopBtn"
        className={classes.btnsWrp}
        onClick={() => {
          onFinishCheckingMicrophone();
        }}
      >
        <Button btnText={texts.buttonSTOPText} btnNumber="1" />
      </div>
    );
  };
  //////////////////////////////////////////////////////////////////////////////
  //generating scale on lineTables (many div for 20px)
  let createLineTable = () => {
    let lineHeight = document.getElementById("linesTable").clientHeight,
      //calculating the number of cells in a table with a height of 20 px and a line thickness of 1 px.
      numOfItems = Math.floor(lineHeight / 20) - (lineHeight / 20) * 0.1,
      // get of the item
      lineTable = document.getElementById("linesTable");
      console.log(lineHeight)
    // creating table cells and inserting them into the DOM
    for (let i = 0; i < numOfItems; i++) {
      let div = document.createElement("div");
      div.className = "linesItem"; //styles '.linesItem' from settingsPageContainer.module.scss
      div.style.borderTop = "2px solid rgba(6, 24, 68, 0.8)";
      div.style.width = "80%";
      div.style.height = "20px";
      lineTable.appendChild(div);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    //generating scale on lineTables (many div for 20px)
    createLineTable();
  }, []);

  return (
    <div className={classes.PageContainer}>
      <div style={bgShape} />
      <div className={classes.globalBacGround}></div>
      <div className={classes.PageWrp}>
        {/* advertisment */}
        <div className={classes.column}>
          <AdvertismentBlock
            adv={props.adv1}
            currentLanguage={props.currentLanguage}
          />
          <AdvertismentBlock
            adv={props.adv2}
            currentLanguage={props.currentLanguage}
          />
        </div>
        {/* Title and button */}
        <div className={classes.column}>
          <div className={classes.title}>
            <div>
              <img src={oraokeLogo} alt={"Logo"} />
            </div>
            <div>
              {!props.isCheckingMicrophoneStart && <p>{texts.titleText}</p>}
              {pushStartNotScreamed && <p>{texts.shoutText}</p>}
              {props.isSetMaxUserVoiceLevel && (
              <p>
                {texts.fineText} <br /> {texts.backToSongChooseText}
              </p>
            )}
            </div>
          </div>
          {/* START or STOP Buttons */}
          {startOrStopButton()}
          {
              <div
                id="toSongsBtn"
                className={toSongBtnClassNames}
                onClick={() => {
                  onFinishCheckingMicrophone();
                }}
              >
                <NavLink to={"/song-choose-page"}>
                  <Button btnText={texts.buttonToSong} btnNumber="2" />
                </NavLink>
              </div>
            }
          <fieldset className={classes.volumeControlWrp}>
            <legend>{texts.changeMicrophoneSensibility}</legend>
              <label>
                <span>{texts.high}&emsp;</span>
                <input
                  type="range"
                  max="31"
                  min="1"
                  step="5"
                  value={props.sensibilityOfFly}
                  onChange={(value) => props.setSensibilityOfFly(value.target.value)}
                />
                <span> &emsp;{texts.low}</span>
              </label>
            </fieldset>
          {/*after success test*/}
          <div className={classes.title}>
            
          </div>
        </div>
        {/* Table and bird */}
        <div className={classes.column}>
          <div className={classes.voiceLevelTable}>
            <div className={classes.linesTable} id="linesTable">
              {/* There will be divs from Useeffect */}
            </div>
            <div className={classes.birdMainWrp}>
              <div id="bird" className={classes.birdWrp}>
                <img src={birdLeft} alt="bird" />
              </div>
            </div>
          </div>
        </div>
        <div id="toMainMenu" className={classes.toMainMenu}>
          <NavLink to={"/start-page"}>
            <span>{texts.mainMenuText}</span>
          </NavLink>
        </div>
        <div className={classes.langToggle}>
          <span onClick={() => props.currentLanguageToggle("ru")}>рус</span>
          <span>|</span>
          <span onClick={() => props.currentLanguageToggle("en")}>eng</span>
        </div>
      </div>
    </div>
  );
});

export default SettingsPage;
