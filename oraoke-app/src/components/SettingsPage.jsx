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
  let num = 32, //количество элементов в массиве в который будет записан звук с микрофона
    array,
    context,
    bird,
    birdHeigth,
    analyser,
    src,
    maxHeightForWile = 255,
    texts;

  //тексты на разных языках
  switch (props.currentLanguage) {
    case "ru":
      texts = {
        titleText:
          "Нажмите на кнопку “Старт” и разрешите браузеру доступ к микрофону",
        shoutText:
          "Крикните в микрофон так, чтобы птичка поднялась в зеленую зону",
        fineText: "Отлично!",
        backToSongChooseText: "Вернитесь к выбору песни",
        buttonStartText: "СТАРТ",
        buttonSTOPText: "СТОП",
        buttonToSong: "К песням",
        mainMenuText: "Главное меню",
      };
      break;
    case "en":
      texts = {
        titleText:
          "Click on the “Start” button and allow the browser access to the microphone",
        shoutText:
          "Shout into the microphone so that the bird up to the green zone",
        fineText: "OK!",
        backToSongChooseText: "Back to the song selection",
        buttonStartText: "START",
        buttonSTOPText: "STOP",
        buttonToSong: "To songs",
        mainMenuText: "Main menu",
      };
      break;
    default:
      return null;
  }

  //////////////////////////////////////////////////////////////////////////////////
  //Функцмя подъема птицы в зависимости от звука с микрофона
  let onStartCheckingMicrophone = () => {
    let scaleItems = document.getElementsByClassName(
      "SettingsPageContainer_linesItem__X_rp1"
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
    //получаем поток с микрофона и работаем с ним
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        analyser.connect(context.destination); //вывод звука на колонки

        // loop(); рекурсивная функция обрабатывающая звук с микрофона
        let loop = setTimeout(function moveBird() {
          let lineHeight = document.getElementById("linesTable").clientHeight; //высота шкалы

          birdHeigth = bird.clientHeight; //высота птицы

          analyser.getByteFrequencyData(array); //получение данных частот

          // получение среднего уровня сигнала в массиве (с микрофона)
          let averageHeight =
            array.reduce((summ, current) => summ + current) / array.length;

          // Задание высоты подъема птицы от стреднего уровня сигнала в массиве
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

          // значение подъема птицы как числа (без .px)
          let birdFlyingHidhLikeNum = birdFlyingHidh.slice(0, -2); //remove 'px' from end

          // Динамическое закрашивание секций на шкале
          for (let i = 0; i < scaleItems.length; i++) {
            if (i < +birdFlyingHidhLikeNum / 20) {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor =
                "rgba(255, 29, 190, 0.8)";
            } else {
              scaleItems[scaleItems.length - 1 - i].style.backgroundColor = "";
            }
          }

          //Запись максимального значения голоса в state
          if (averageHeight > 190) {
            props.isSetMaxUserVoiceLevelSuccsess(true); //успешная калибровка
            if (averageHeight > props.maxUserVoiceLevel) {
              props.setMaxUserVoiceLevel(averageHeight);
            }
          }

          loop = setTimeout(moveBird, 30); // рекурсия
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
  //Остановка всего. захвата звука, полета птицы и закрашивания блоков
  let stopBirdFliying = (loop, bird, analyser, scaleItems) => {
    clearTimeout(loop);
    bird.style.marginBottom = 0 + "px";
    analyser.disconnect();
    for (let i = 0; i < scaleItems.length; i++) {
      scaleItems[i].style.backgroundColor = "";
    }
  };

  // остановка калибровки микрофона
  let onFinishCheckingMicrophone = () => {
    props.toggleIsCheckingMicrophoneStart(!props.isCheckingMicrophoneStart);
  };

  //калибровка запущена, но максимальное значение голоса не установлено
  let pushStartNotScreamed =
    props.isCheckingMicrophoneStart && !props.isSetMaxUserVoiceLevel;

  // появление кнопки выхода после окончания калибровки
  let toSongBtnClassNames = `${classes.btnsWrp} ${
    props.isSetMaxUserVoiceLevel ? classes.visible : classes.unvisible
  }`;

  //////////////////////////////////////////////////////////////////
  // Отображение кнопки старт или стоп
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
      //расчет количества ячеек в таблице высотой 20 px и толщиной линии 1 px.
      numOfItems = Math.floor(lineHeight / 20) - (lineHeight / 20) * 0.1,
      // получение элемента
      lineTable = document.getElementById("linesTable");

    // создание ячеек таблицы и вставка их в дом
    for (let i = 0; i < numOfItems; i++) {
      let div = document.createElement("div");
      div.className = "SettingsPageContainer_linesItem__X_rp1"; //styles '.linesItem' from settingsPageContainer.module.scss
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
            </div>
          </div>
          {/* START or STOP Buttons */}
          {startOrStopButton()}
          {/*after success test*/}
          <div className={classes.title}>
            {props.isSetMaxUserVoiceLevel && (
              <p>
                {texts.fineText} <br /> {texts.backToSongChooseText}
              </p>
            )}
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
          </div>
        </div>
        {/* Table and bird */}
        <div className={classes.column}>
          <div className={classes.voiceLevelTable}>
            <div className={classes.linesTable} id="linesTable">
              {/* Тут будут дивы из UseEffecta */}
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
