import React from "react";
import SongPlayPage from "./SongPlayPage";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getMaxUserVoiceLevel,
  getIsSetMaxUserVoiceLevel,
  getAdv,
} from "../redux/settingsPageSelectors";
import {
  getcurrentSongSelector,
  getSongsSelector,
  getIsStopBtnPushed,
  getCanvas,
  getCanvasWrp,
  getSongMP3,
  getIsCurrentSongPlayingSetter,
  getTimerSongPlaying,
  getXCoordOfBird,
  getYCoordOfBird,
} from "../redux/startPageSelectors";
import {
  isPlayingSet,
  stopBtnIsPushSet,
  saveDOMElementToState,
  isCurrentSongPlayingSetter,
  sendChangingMoveDataToState,
} from "./../redux/startPageReduser";

class SongPlayPageContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = null;
    this.canvasWrpRef = null;
    this.songMP3Ref = null;
    this.textWrpRef = null;
    //////////////////////////
    //Забиндить this для всех методов где это надо
    this.getElementFromDOMorState = this.getElementFromDOMorState.bind(this);
    this.isCurrentSongPlayingSet = this.isCurrentSongPlayingSet.bind(this);
    this.setCanvasHeigth = this.setCanvasHeigth.bind(this);
    this.playSongStart = this.playSongStart.bind(this);
    this.playSongStop = this.playSongStop.bind(this);
    this.playSongPause = this.playSongPause.bind(this);
    this.playPauseOnSpaseBtn = this.playPauseOnSpaseBtn.bind(this);
    this.paintRect = this.paintRect.bind(this);
    this.paintTriangle = this.paintTriangle.bind(this);
    this.paintingCanvasField = this.paintingCanvasField.bind(this);
    this.moveCanvasAndTextToLeft = this.moveCanvasAndTextToLeft.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.stopSigningAndMoving = this.stopSigningAndMoving.bind(this);
    this.pauseSigningAndMoving = this.pauseSigningAndMoving.bind(this);
    this.startSigningAndMoving = this.startSigningAndMoving.bind(this);
    this.runMoving = this.runMoving.bind(this);
    this.sendChangingDataToState = this.sendChangingDataToState.bind(this);
    ////////////////////////////////////////
    //ref calback to DOM elements
    this.canvasRefGetter = (el) => {
      this.canvasRef = el;
    };
    this.canvasWrpRefGetter = (el) => {
      this.canvasWrpRef = el;
    };
    this.songMP3RefGetter = (el) => {
      this.songMP3Ref = el;
    };
    this.textWrpRefGetter = (el) => {
      this.textWrpRef = el;
    };

    this.timerId = 0; //таймер для движения поля
    this.shiftTextToLeft = 700; //начальная точка сдвига текста
    this.xCoordOfBird = 200; //начальное положение птицы по оси х
    this.yCoordOfBird = 50; //начальное положение птицы по оси y
  }

  componentDidMount() {
    this.saveDOMElementsToState(); //сохранение всех нужных DOM элементов в стейте
    this.setCanvasHeigth(); //изменение высоты canvas по родителю
    //пересчет размеров поля canvas при изменении размеров окна браузера
    window.addEventListener("resize", this.setCanvasHeigth);

    //Отрисовка всего поля canvas
    this.paintingCanvasField();

    //Запуск проигрывания файла через 4 секунды
    const autoPlaySong =
      !this.props.isCurrentSongPlaying &&
      setTimeout(
        this.startSigningAndMoving,
        4000,
        this.props.currentSong.startMovingDelay
      );

    document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setCanvasHeigth);
    document.removeEventListener("keyup", this.playPauseOnSpaseBtn);
    clearTimeout(this.autoPlaySong);
  }

  // ///////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // получение элемента из стейта, а если его там нет, то из DOM (при прокиданном
  // коллбеке ...RefGetter)
  getElementFromDOMorState(elementRef, elementName) {
    if (elementRef && !this.props[elementName]) {
      return elementRef;
    } else {
      return this.props[elementName];
    }
  }

  //сохранение всех нужных DOM элементов в стейте
  saveDOMElementsToState() {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const canvasWrp = this.getElementFromDOMorState(
      this.canvasWrpRef,
      "canvasWrp"
    );
    const songMP3 = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    const textWrp = this.getElementFromDOMorState(this.textWrpRef, "textWrp");
    this.props.saveDOMElementToState(canvas, "canvas");
    this.props.saveDOMElementToState(canvasWrp, "canvasWrp");
    this.props.saveDOMElementToState(songMP3, "songMP3");
    this.props.saveDOMElementToState(textWrp, "textWrp");
  }

  //toggle isCurrentSongPlaing
  isCurrentSongPlayingSet(isCurrentSongPlaying) {
    this.props.isCurrentSongPlayingSetter(isCurrentSongPlaying);
  }

  // изменение высоты canvas
  setCanvasHeigth() {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const canvasWrp = this.getElementFromDOMorState(
      this.canvasWrpRef,
      "canvasWrp"
    );
    //устанавливаем высоту планшета на 80 px меньше родителя (80 для текста)
    let canvasHeigth = canvasWrp.clientHeight - 80;
    canvas.style.height = `${canvasHeigth}px`;
  }
  // ////////////////////////////////////////////////////////////////////////
  // Запуск фоновой песни
  playSongStart() {
    const audio = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    audio.play();
    this.isCurrentSongPlayingSet(true);
  }
  // ////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни и отправка к началу
  playSongStop() {
    const audio = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    audio.pause();
    audio.currentTime = 0;
    this.isCurrentSongPlayingSet(false);
  }

  // ////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни на текущем месте
  playSongPause() {
    const audio = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    audio.pause();
    this.isCurrentSongPlayingSet(false);
  }
  // ///////////////////////////////////////////////////////////////////////// //
  // Пауза на текущем месте при нажатии клавиш "Space" (служебная функция без
  // remoove)

  playPauseOnSpaseBtn(event) {
    event.preventDefault();
    if (event.code === "Space" && this.props.isCurrentSongPlaying) {
      this.pauseSigningAndMoving();
    } else if (event.code === "Space" && !this.props.isCurrentSongPlaying) {
      this.startSigningAndMoving(0);
    }
  }

  // ///////////////////////////////////////////////////////////////////////////
  // рисование прямоугольника
  paintRect(
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (вверху)
    x2, //конечная x (справа)
    y2, //конечная y (внизу)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)"
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  paintTriangle(
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (вверху)
    x2, //x вершины
    y2, //y  вершины
    x3, //конечная x (справа)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)"
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  paintingCanvasField() {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    let canvasWidth = canvas.width; //ширина
    let canvasHeigth = canvas.offsetHeight; //высота
    canvas.height = canvas.offsetHeight; //Чтобы изображение не растягивалось
    const ctx = canvas.getContext("2d");

    //рисование
    for (let x = 0; x < canvasWidth; x += 100) {
      this.paintRect(ctx, x, 0, x + 50, canvasHeigth / 3);
      this.paintTriangle(
        ctx,
        50 + x,
        canvasHeigth + 9,
        50 + x + 25,
        canvasHeigth - canvasHeigth / 3,
        50 + x + 50
      );
    }
  }

  // ///////////////////////////////////////////////////////////////////////
  // движение поля влево

  moveCanvasAndTextToLeft(speed) {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const textWrp = this.getElementFromDOMorState(this.textWrpRef, "textWrp");
    let canvasWidth = canvas.width; //          ширина
    this.shiftTextToLeft -= 1;
    if (Math.abs(this.shiftTextToLeft) < canvasWidth) {
      textWrp.style.marginLeft = `${this.shiftTextToLeft}px`; // Этосдвиг текста
      if (this.shiftTextToLeft <= 20) {
        canvas.style.left = `${this.shiftTextToLeft}px`; // Это сдвиг поля
      }
    }
    if (
      this.props.isStopBtnPushed ||
      Math.abs(this.shiftTextToLeft) > canvasWidth
    ) {
      this.stopSigningAndMoving(); //остановка
      canvas.style.left = 0; //возврат поля в начало
      textWrp.style.marginLeft = `${speed * 3}px`; // возврат текста в исх позицию
      this.shiftTextToLeft = speed * 3.5; //сброс счетчика сдвига текстового поля
    }
    this.sendChangingDataToState(this.shiftTextToLeft);
  }

  ////////////////////////////////////
  //сброс таймера settimeout-на движение поля
  clearTimer() {
    clearInterval(this.timerId);
    console.log("Таймер остановлен");
    // this.timerId = 0;//Эти сбросы не работают!!!!!! НАдо сделать сброс сдвига поля
    // this.shiftTextToLeft = 0;
  }
  // ////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  stopSigningAndMoving() {
    this.playSongStop();
    this.clearTimer();
  }

  // ////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения на текущем моменте
  pauseSigningAndMoving() {
    this.playSongPause();
    this.clearTimer();
  }

  // ////////////////////////////////////////////////////////////////////////
  // Запуск проигрывания и движения поля
  startSigningAndMoving(delay) {
    const delayMs = delay * 1000; //задержка движения текста и поля относительно музыки
    this.props.stopBtnIsPushSet(false);
    this.playSongStart();
    //если с начала, то текст с задержкой запускается
    setTimeout(this.runMoving, delayMs, this.props.currentSong.playbackSpeed);
  }

  ////////////////////////////////////////////////////
  //запуск движения поля и текста со скростью speed px/с
  runMoving(speed) {
    this.timerId = setInterval(
      this.moveCanvasAndTextToLeft,
      1000 / speed,
      speed
    );
    return this.timerId;
  }

  //////////////////////////////////////////////////////////
  //передача координаты птицы и текущего времени в переменную и потом в пропсы
  sendChangingDataToState(xCoordOfBird, yCoordOfBird) {
    this.xCoordOfBird = xCoordOfBird;
    this.yCoordOfBird = yCoordOfBird;
    this.props.sendChangingMoveDataToState(xCoordOfBird, yCoordOfBird);
  }
  // //////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
        <SongPlayPage
          canvasRefGetter={this.canvasRefGetter}
          canvasWrpRefGetter={this.canvasWrpRefGetter}
          songMP3RefGetter={this.songMP3RefGetter}
          textWrpRefGetter={this.textWrpRefGetter}
          stopSigningAndMoving={this.stopSigningAndMoving}
          startSigningAndMoving={this.startSigningAndMoving}
          isCurrentSongPlaying={this.props.isCurrentSongPlaying}
          xCoordOfBird={this.xCoordOfBird}
          {...this.props}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  currentSong: getcurrentSongSelector(state),
  songs: getSongsSelector(state),
  adv7: getAdv(state, 7),
  adv8: getAdv(state, 8),
  isStopBtnPushed: getIsStopBtnPushed(state),
  canvas: getCanvas(state),
  canvasWrp: getCanvasWrp(state),
  songMP3: getSongMP3(state),
  isCurrentSongPlaying: getIsCurrentSongPlayingSetter(state),
  timerSongPlaying: getTimerSongPlaying(state),
  xCoordOfBird: getXCoordOfBird(state),
  yCoordOfBird: getYCoordOfBird(state),
});

export default compose(
  connect(mapStateToProps, {
    saveDOMElementToState,
    stopBtnIsPushSet,
    isPlayingSet,
    isCurrentSongPlayingSetter,
    sendChangingMoveDataToState,
  })
)(SongPlayPageContainer);
