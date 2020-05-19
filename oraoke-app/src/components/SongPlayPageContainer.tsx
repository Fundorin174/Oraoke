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
  getBirdOnCanvas,
  getIsCurrentSongPlayingSetter,
  getXCoordOfBird,
  getYCoordOfBird,
  getSoundExploision,
  getSoundOfFinish,
  getSrcToSoundExploision,
  getSrcToSoundOfFinish,
  getSrcTofinishLineImg,
  getFinishLineXCoordinate,
  getCurrentSongVolume,
  getCurrentVoiceVolume,
  getCurrentLanguage,
  getTextWrp,
} from "../redux/startPageSelectors";
import {
  stopBtnIsPushSet,
  saveDOMElementToState,
  isCurrentSongPlayingSetter,
  sendChangingMoveDataToState,
  setNewVolumeOfSong,
  setNewVolumeOfVoice,
  currentLanguageToggle,
  SongType,
} from "../redux/startPageReduser";
import { AdvertismentType } from "../redux/settingsPageReduser";
import { AppStateType } from "../redux/redux-store";

type SongPlayPageContainerStateType = {
  canvasRef: null | HTMLCanvasElement;
  canvasWrpRef: null | HTMLElement;
  songMP3Ref: null | HTMLAudioElement;
  textWrpRef: null | HTMLElement;
  birdRef: null | HTMLElement;
  soundExploisionRef: null | HTMLAudioElement;
  soundOfFinishRef: null | HTMLAudioElement;
  songVolumeInputRef: null | HTMLElement;
  voiceVolumeInputRef: null | HTMLElement;
  allLinesCoordinatesArray: Array<any>;
  birdCoordinatesArray: Array<any>;
  voiceArray: null | Uint8Array;
  numOfItemsInVoiceArray: number;
  analyser: any;
  flying: number;
  ctx: any;
  canvasHeight: number;
  timerId: any;
  moovingStartTimer: any;
  shiftTextToLeft: number;
  xCoordOfBird: number;
  yCoordOfBird: number;
  autoPlaySong: any;
};

class SongPlayPageContainer extends React.PureComponent<
  SongPlayPageContainerPropsType,
  SongPlayPageContainerStateType
> {
  constructor(props: SongPlayPageContainerPropsType) {
    super(props);

    this.state = {
      canvasRef: null,
      canvasWrpRef: null,
      songMP3Ref: null,
      textWrpRef: null,
      birdRef: null,
      soundExploisionRef: null,
      soundOfFinishRef: null,
      songVolumeInputRef: null,
      voiceVolumeInputRef: null,
      allLinesCoordinatesArray: [], //массив с координатами внешних границ всех препятствий
      birdCoordinatesArray: [], //массив координат прицы на данный момент
      voiceArray: null, //массив для хранеия данных с микрофона
      numOfItemsInVoiceArray: 32, //количество элементов в массиве
      // в который будет записан звук с микрофона
      analyser: null,
      flying: 0,
      ctx: undefined, //контекст для рисования в canvas
      canvasHeight: 0,
      timerId: 0, //таймер для движения поля
      moovingStartTimer: 0, //SetTimeout задержки запуска движения относительно музыки
      shiftTextToLeft: 700, //начальная точка сдвига текста
      xCoordOfBird: 185, //начальное положение птицы по оси х меняется
      // в функции moveCanvasAndTextToLeft
      yCoordOfBird: 50, //начальное положение птицы по оси y
      //меняется в функции mooveBirdByVoice
      autoPlaySong: null,
    };
    // this.window = window;
    // this.canvasRef = null;
    // this.canvasWrpRef = null;

    //////////////////////////
    //Забиндить this для всех методов где это надо
    this.getElementFromDOMorState = this.getElementFromDOMorState.bind(this);
    this.isCurrentSongPlayingSet = this.isCurrentSongPlayingSet.bind(this);
    this.setCanvasHeigthAndWidth = this.setCanvasHeigthAndWidth.bind(this);
    this.playSongStart = this.playSongStart.bind(this);
    this.playSongStop = this.playSongStop.bind(this);
    this.playSongPause = this.playSongPause.bind(this);
    this.playPauseOnSpaseBtn = this.playPauseOnSpaseBtn.bind(this);
    this.paintTriangle = this.paintTriangle.bind(this);
    this.paintCircle = this.paintCircle.bind(this);
    this.paintingCanvasField = this.paintingCanvasField.bind(this);
    this.moveCanvasAndTextToLeft = this.moveCanvasAndTextToLeft.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.compareObstacleAndBirdCoordinates = this.compareObstacleAndBirdCoordinates.bind(
      this
    );
    this.stopSigningAndMoving = this.stopSigningAndMoving.bind(this);
    this.pauseSigningAndMoving = this.pauseSigningAndMoving.bind(this);
    this.startSigningAndMoving = this.startSigningAndMoving.bind(this);
    this.runMoving = this.runMoving.bind(this);
    this.stopBirdFlying = this.stopBirdFlying.bind(this);
    this.sendChangingDataToState = this.sendChangingDataToState.bind(this);
    this.checkBirdFacedOnWall = this.checkBirdFacedOnWall.bind(this);
    this.mooveBirdByVoice = this.mooveBirdByVoice.bind(this);
    this.createBirdCoordinatesArray = this.createBirdCoordinatesArray.bind(
      this
    );
    this.playSoundExploisionStart = this.playSoundExploisionStart.bind(this);
    this.changeVolumeOfSong = this.changeVolumeOfSong.bind(this);
    this.changeVolumeOfVoice = this.changeVolumeOfVoice.bind(this);
    // this.canvasRefGetter = this.canvasRefGetter.bind(this);
    // this.canvasWrpRefGetter = this.canvasWrpRefGetter.bind(this);
    // this.songMP3RefGetter = this.songMP3RefGetter.bind(this);
    // this.textWrpRefGetter = this.textWrpRefGetter.bind(this);
    // this.birdRefGetter = this.birdRefGetter.bind(this);
    // this.soundExploisionRefGetter = this.soundExploisionRefGetter.bind(this);
    // this.soundOfFinishRefGetter = this.soundOfFinishRefGetter.bind(this);
    // this.songVolumeInputRefGetter = this.songVolumeInputRefGetter.bind(this);
    // this.voiceVolumeInputRefGetter = this.voiceVolumeInputRefGetter.bind(this);

    ////////////////////////////////////////
    //ref calback to DOM elements
    this.canvasRefGetter = (el: HTMLCanvasElement) => {
      this.setState({
        canvasRef: el,
      });
    };
    this.canvasWrpRefGetter = (el: HTMLElement) => {
      this.setState({
        canvasWrpRef: el,
      });
    };
    this.songMP3RefGetter = (el: HTMLAudioElement) => {
      this.setState({
        songMP3Ref: el,
      });
    };
    this.textWrpRefGetter = (el: HTMLElement) => {
      this.setState({
        textWrpRef: el,
      });
    };
    this.birdRefGetter = (el: HTMLElement) => {
      this.setState({
        birdRef: el,
      });
    };
    this.soundExploisionRefGetter = (el: HTMLAudioElement) => {
      this.setState({
        soundExploisionRef: el,
      });
    };
    this.soundOfFinishRefGetter = (el: HTMLAudioElement) => {
      this.setState({
        soundOfFinishRef: el,
      });
    };
    this.songVolumeInputRefGetter = (el: HTMLElement) => {
      this.setState({
        songVolumeInputRef: el,
      });
    };
    this.voiceVolumeInputRefGetter = (el: HTMLElement) => {
      this.setState({
        voiceVolumeInputRef: el,
      });
    };
  }

  canvasRefGetter(el: HTMLCanvasElement) {}
  canvasWrpRefGetter = (el: HTMLElement) => {};
  songMP3RefGetter = (el: HTMLAudioElement) => {};
  textWrpRefGetter = (el: HTMLElement) => {};
  birdRefGetter = (el: HTMLElement) => {};
  soundExploisionRefGetter = (el: HTMLAudioElement) => {};
  soundOfFinishRefGetter = (el: HTMLAudioElement) => {};
  songVolumeInputRefGetter = (el: HTMLElement) => {};
  voiceVolumeInputRefGetter = (el: HTMLElement) => {};
  /////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.saveDOMElementsToState(); //сохранение всех нужных DOM элементов в стейте

    this.setCanvasHeigthAndWidth(); //изменение высоты canvas по родителю

    //перезагрузка страницы при изменении размеров окна браузера
    window.addEventListener("resize", () => window.location.reload());

    //Отрисовка всего поля canvas
    this.paintingCanvasField();
    // запуск проверки на столкновение птицы и препятствия
    this.checkBirdFacedOnWall();
    // запуск подъема птицы в зависимости от уровня голоса с микрофона
    this.mooveBirdByVoice();

    //Запуск проигрывания файла через 4 секунды
    const autoPlaySong =
      !this.props.isCurrentSongPlaying &&
      setTimeout(
        this.startSigningAndMoving,
        1000,
        this.props.currentSong.startMovingDelay
      );

    this.setState({
      autoPlaySong: autoPlaySong,
    });

    // songVolumeInput.addEventListener('change', (value) => {
    //   this.changeVolumeOfSong(value);
    // }, false)
    document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //@ts-ignore
  componentDidUpdate(
    prevProps: SongPlayPageContainerPropsType,
    prevState: AppStateType
  ) {
    // Нажатие на кнопку СТОП - возврат к началу
    if (
      this.props.isStopBtnPushed &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.playSongStop();
      this.checkBirdFacedOnWall();
      this.sendChangingDataToState(150, 0); //сброс массива координат прицы в пропсах
    }
    //нажатие на кнопку старт при перезапуске песни.
    if (
      !this.props.isStopBtnPushed &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.checkBirdFacedOnWall();
      this.mooveBirdByVoice();
      this.sendChangingDataToState(150, 0); //сброс массива координат прицы в пропсах
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  componentWillUnmount() {
    window.removeEventListener("resize", this.setCanvasHeigthAndWidth);
    document.removeEventListener("keyup", this.playPauseOnSpaseBtn);
    clearTimeout(this.state.autoPlaySong);
    this.stopBirdFlying();
  }

  // ///////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // получение элемента из стейта, а если его там нет, то из DOM (при прокиданном
  // коллбеке ...RefGetter)
  getElementFromDOMorState(
    elementRef: HTMLElement | HTMLAudioElement | HTMLCanvasElement | null,
    elementName: string
  ) {
    if (
      //@ts-ignore
      (elementRef && !this.props[elementName]) ||
      (elementRef && elementRef.clientHeight === 0)
    ) {
      return elementRef;
    } else {
      //@ts-ignore
      return this.props[elementName];
    }
  }

  //сохранение всех нужных DOM элементов из локального стейта в store
  saveDOMElementsToState() {
    const canvasWrp = this.getElementFromDOMorState(
      this.state.canvasWrpRef,
      "canvasWrp"
    );
    const canvas = this.getElementFromDOMorState(
      this.state.canvasRef,
      "canvas"
    );
    const songMP3 = this.getElementFromDOMorState(
      this.state.songMP3Ref,
      "songMP3"
    );
    const textWrp = this.getElementFromDOMorState(
      this.state.textWrpRef,
      "textWrp"
    );
    const birdOnCanvas = this.getElementFromDOMorState(
      this.state.birdRef,
      "birdOnCanvas"
    );
    const soundExploision = this.getElementFromDOMorState(
      this.state.soundExploisionRef,
      "soundExploision"
    );
    const soundOfFinish = this.getElementFromDOMorState(
      this.state.soundOfFinishRef,
      "soundOfFinish"
    );
    this.props.saveDOMElementToState(canvasWrp, "canvasWrp");
    this.props.saveDOMElementToState(canvas, "canvas");
    this.props.saveDOMElementToState(songMP3, "songMP3");
    this.props.saveDOMElementToState(textWrp, "textWrp");
    this.props.saveDOMElementToState(birdOnCanvas, "birdOnCanvas");
    this.props.saveDOMElementToState(soundExploision, "soundExploision");
    this.props.saveDOMElementToState(soundOfFinish, "soundOfFinish");
  }

  ////////////////////////////////////////////////////////////////////////
  //РАБОТА С МУЗЫКОЙ
  ///////////////////////////////////////////////////////////////////////

  //toggle isCurrentSongPlaing
  isCurrentSongPlayingSet(isCurrentSongPlaying: boolean) {
    this.props.isCurrentSongPlayingSetter(isCurrentSongPlaying);
  }

  // ////////////////////////////////////////////////////////////////////////
  // Запуск фоновой песни
  playSongStart() {
    const audio = this.getElementFromDOMorState(
      this.state.songMP3Ref,
      "songMP3"
    );
    audio.volume = this.props.currentSongVolume; // получение громкости из props
    // в зависимости от инпута
    audio.play();
    this.isCurrentSongPlayingSet(true);
  }

  /////////////////////////////////////////////////////////////////////////
  //Запуск звука взрыва при столкновении
  playSoundExploisionStart() {
    const soundExploision = this.getElementFromDOMorState(
      this.state.soundExploisionRef,
      "soundExploision"
    );
    soundExploision.play();
  }

  ////////////////////////////////////////////////////////////////////////
  //запуск зпобедных фанфар при прохождении до конца
  playSoundOfFinish() {
    const soundOfFinish = this.state.soundOfFinishRef;
    soundOfFinish?.play();
  }

  // ////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни и отправка к началу
  playSongStop() {
    const audio = this.getElementFromDOMorState(
      this.state.songMP3Ref,
      "songMP3"
    );
    audio.pause();
    audio.currentTime = 0;
    this.isCurrentSongPlayingSet(false);
  }

  // ////////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни на текущем месте
  playSongPause() {
    const audio = this.getElementFromDOMorState(
      this.state.songMP3Ref,
      "songMP3"
    );
    audio.pause();
    this.isCurrentSongPlayingSet(false);
  }

  // ///////////////////////////////////////////////////////////////////////// //
  // Пауза на текущем месте при нажатии клавиш "Space" (служебная функция без
  // remoove)

  playPauseOnSpaseBtn(event: any) {
    event.preventDefault();
    if (event.code === "Space" && this.props.isCurrentSongPlaying) {
      this.pauseSigningAndMoving();
    } else if (event.code === "Space" && !this.props.isCurrentSongPlaying) {
      this.startSigningAndMoving(0);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //изменение громкости музыки
  changeVolumeOfSong(value: any) {
    this.props.setNewVolumeOfSong(value.target.value);
  }

  //////////////////////////////////////////////////////////////////////////
  //изменение громкости голоса
  changeVolumeOfVoice(value: any) {
    this.props.setNewVolumeOfVoice(value.target.value);
  }

  //////////////////////////////////////////////////////////////////////////////
  //движение птицы в зависимости от звука с микрофона
  mooveBirdByVoice() {
    const birdOnCanvas =
      this.props.birdOnCanvas && this.props.birdOnCanvas.clientHeight !== 0
        ? this.props.birdOnCanvas
        : this.state.birdRef;

    const canvas =
      this.props.canvas && this.props.canvas.clientHeight !== 0
        ? this.props.canvas
        : (this.state.canvasRef as HTMLCanvasElement);
    const birdHeigth = birdOnCanvas ? birdOnCanvas.clientHeight : 75; //высота птицы
    let maxHeightForWile = this.props.isSetMaxUserVoiceLevel
      ? this.props.maxUserVoiceLevel
      : 255;
    let canvasHeight = canvas ? canvas.clientHeight : 0;
    this.setState({
      voiceArray: new Uint8Array(this.state.numOfItemsInVoiceArray),
    });

    // if (this.context) return;
    //@ts-ignore
    let context = new (window.AudioContext || window.webkitAudioContext)(); //аудиоконтекст WEB AudioAPI
    let analyser = context.createAnalyser();
    let gainNode = context.createGain(); //создание усилительного узла
    this.setState({ analyser: analyser }); //передаем данные в глобальную переменную для сброса
    //получаем поток с микрофона и работаем с ним
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let srcOfVoice = context.createMediaStreamSource(stream);
        srcOfVoice.connect(analyser); //передача звука в аналайзер
        analyser.connect(gainNode); //включение усилителя перед колонками
        gainNode.connect(context.destination); //вывод звука c усилителя на колонки
        gainNode.gain.setValueAtTime(
          +this.props.currentVoiceVolume,
          context.currentTime
        ); //усиление/ослабление исходного звука
        // в зависимости от инпута через стейт звука
        let prevbirdFlyingHigh: number;
        let birdFlyingFinish;
        //рекурсивная функция обработки принятого звука с частотой примерно 60 раз в секугду
        let loop = () => {
          let flying = window.requestAnimationFrame(loop);
          this.state.voiceArray &&
            analyser.getByteFrequencyData(this.state.voiceArray); //получение данных частот
          this.setState({ flying: flying }); //передаем данные в глобальную переменную для сброса

          // Получение усредненного значения звука по всем частотам - это и будет текущее
          // значение уровня звука
          let averageHeight = this.state.voiceArray
            ? this.state.voiceArray.reduce((summ, current) => summ + current) /
              this.state.voiceArray.length
            : 0;

          // Задание высоты подъема птицы от стреднего уровня сигнала в массиве
          let birdFlyingHigh =
            (canvasHeight * averageHeight) / maxHeightForWile <
            canvasHeight - birdHeigth
              ? (canvasHeight * averageHeight) / maxHeightForWile
              : canvasHeight - birdHeigth;
          // console.log(`текущее: ${averageHeight} максимальное:
          // ${maxHeightForWile} Итоговое: ${birdFlyingHigh}. Общая высота ${canvasHeight} `);

          //если очередное значение отличается от предыдущего больше чем на 2 то уменьшаем разницу
          // до 1. Чтобы убрать резкие скачки.
          if (
            birdFlyingHigh - prevbirdFlyingHigh > 2 &&
            birdFlyingHigh - prevbirdFlyingHigh > 0
          ) {
            birdFlyingFinish = prevbirdFlyingHigh + 1 + 70 + "px";
          } else if (
            Math.abs(birdFlyingHigh - prevbirdFlyingHigh) > 2 &&
            birdFlyingHigh - prevbirdFlyingHigh < 0
          ) {
            birdFlyingFinish = prevbirdFlyingHigh - 1 + 70 + "px";
          } else {
            birdFlyingFinish = birdFlyingHigh + 70 + "px";
          }

          //записать текущее значение в предыдущее
          // для сравнения на следующем шаге
          prevbirdFlyingHigh = birdFlyingHigh;

          //changing bottom - and fly. сдвиг птицы на высоту birdFlyingFinish))
          birdOnCanvas &&
            birdOnCanvas.setAttribute("style", `bottom: ${birdFlyingFinish}`);
          //birdOnCanvas && birdOnCanvas.style.bottom = birdFlyingFinish;

          // Обновляем значение высоты подъема птицы в глобальной переменной
          this.setState({
            yCoordOfBird: this.props.canvas
              ? canvasHeight - birdFlyingHigh - birdHeigth / 2
              : canvasHeight - birdHeigth / 2, //текущая Y коорината центра птицы
          });

          //Создаем массив координат птицы в тукцщий момент
          this.createBirdCoordinatesArray(birdHeigth);

          //Выход из рекурсии и возврат в начальное положение
          if (
            this.props.isStopBtnPushed ||
            (canvas &&
              Math.abs(this.state.shiftTextToLeft) > canvas.offsetWidth)
          ) {
            this.stopBirdFlying();
          }
        };
        loop();
      })
      .catch((error) => {
        alert(
          // eslint-disable-next-line no-useless-escape
          error + "\r\n Отклонено. Перезагрузите страницу!"
        );
      });
  }

  /////////////////////////////////////////////////////////////////////////
  //сброс птицы в начальное состояние
  stopBirdFlying() {
    cancelAnimationFrame(this.state.flying);
    this.props.birdOnCanvas &&
      this.props.birdOnCanvas.setAttribute("style", `bottom: 70px`);
    //this.props.birdOnCanvas.style.bottom = 70 + "px";
    this.state.analyser && this.state.analyser.disconnect();
  }

  ////////////////////////////////////////////////////////////////////////////
  //Создание массива координат птицы на данный момемнт
  createBirdCoordinatesArray(birdHeigth: number) {
    let xCoordOfBird = this.state.xCoordOfBird; //положение центра птицы по Х
    let yCoordOfBird = this.state.yCoordOfBird; //положение центра птицы по Y

    // функция передачи координат птицы и радиуса ее окружности
    this.saveBirdCoordinatesArray(xCoordOfBird, yCoordOfBird, birdHeigth / 2);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //РАБОТА С ГРАФИКОЙ
  ///////////////////////////////////////////////////////////////////////////////////

  // изменение высоты canvas
  setCanvasHeigthAndWidth() {
    const canvas = this.state.canvasRef;
    const canvasWrp = this.state.canvasWrpRef;
    debugger;
    //устанавливаем высоту планшета на 80 px меньше родителя (80 для текста)
    let canvasHeight = canvasWrp ? canvasWrp.clientHeight - 80 : 0;
    canvas && canvas.setAttribute("height", `${canvasHeight}px`);
    //    canvas && canvas.height = `${canvasHeight}px`;
    this.setState({
      canvasHeight: canvasHeight,
    });
    //this.state.canvasHeight = canvasHeight;
  }

  // ///////////////////////////////////////////////////////////////////////////

  // рисование треугольника
  paintTriangle(
    ctx: any, //контекст
    x1: number, //начальная x (слева)
    y1: number, //начальная y (вверху)
    x2: number, //x вершины
    y2: number, //y  вершины
    x3: number, //конечная x (справа)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)" //цвет контура
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    this.saveLineCoordinates(x1, y1, x2, y2); //сохранить координаты линии в массив
    ctx.lineTo(x3, y1);
    this.saveLineCoordinates(x2, y2, x3, y1); //сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //рисование трапеции
  paintTrapeze(
    ctx: any, //контекст
    x1: number, //начальная x (слева)
    y1: number, //начальная y (внизу)
    x2: number, // сдвиг от начала до первой верхней грани по X
    x3: number, // сдвиг от конца до второй верхней грани по X
    x4: number, //конечная x (справа)
    y2: number, //конечная y (вверху)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)" //цвет контура
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + x2, y2);
    this.saveLineCoordinates(x1, y1, x1 + x2, y2); //сохранить координаты линии в массив
    ctx.lineTo(x4 - x3, y2);
    this.saveLineCoordinates(x1 + x2, y2, x4 - x3, y2); //сохранить координаты линии в массив
    ctx.lineTo(x4, y1);
    this.saveLineCoordinates(x4 - x3, y2, x4, y1); //сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //рисование круга или дуги
  paintCircle(
    ctx: any, //контекст
    x: number, //x центра окружности
    y: number, // y центра окружности
    r: number, // радиус
    startAngle = 0, // начальный угол
    endAngle = 360, //конечный угол
    anticlockwise = false, //если true то против часовой стрелке
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)" //цвет контура
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
    ctx.closePath();
    // ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //////////////////////////////////////////////////////////////////////////////
  //отрисовка всего canvas
  paintingCanvasField() {
    const canvas =
      this.props.canvas && this.props.canvas.clientHeight !== 0
        ? (this.props.canvas as HTMLCanvasElement)
        : (this.state.canvasRef as HTMLCanvasElement);
    let canvasHeight = this.state.canvasHeight; //высота

    if (canvas && canvas.clientHeight !== canvasHeight) {
      canvas.setAttribute("height", `${canvasHeight}`);
      // canvas.height = canvasHeight;
    } //Устанавливаем реальную высоту канвас чтоб изображение не растягивалось
    // canvas.width = canvas.offsetWidth; //Чтобы изображение не растягивалось

    //получение контекста canvas
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    this.setState({ ctx: ctx });

    //рисование

    // Создаем объект изображения финишной линии
    let finishLineImg = new Image();

    // Привязываем функцию к событию onload
    // Рисуем финишную ленту, когда она загружена с шириной 50 и высотой canvasHeight
    // в координатах finishLineXCoordinate, 0
    finishLineImg.onload = () => {
      ctx?.drawImage(
        finishLineImg,
        this.props.finishLineXCoordinate,
        0,
        50,
        (canvasHeight = 0)
      ); //
    };
    // Загружаем файл изображения финишной ленты
    finishLineImg.src = this.props.srcTofinishLineImg;

    //задаем количесство вариантов значения высоты препятствия
    let heightValues = [
      { h0: canvasHeight + 9 },
      { h1: canvasHeight - canvasHeight * 0.1 },
      { h2: canvasHeight - canvasHeight * 0.3 },
      { h3: canvasHeight - canvasHeight * 0.5 },
      { h4: canvasHeight - canvasHeight * 0.7 },
      { h5: canvasHeight - canvasHeight * 0.9 },
      { h6: 0 },
    ];
    let keys = [] as Array<string>;
    let heightData = [] as any;

    //разбиваем heightValues на массив ключей и массив значений
    heightValues.forEach((item: any, i: number) => {
      let key = Object.keys(item);
      keys.push(key[0]); //названия значений высот для сравнения со значением в стейте
      heightData.push(item[key[0]]); //значение высот в пикселях
    });

    //////////////////////////////////////////////////////////////////////
    //Автоматическое рисование фигур на основе данных из стейта
    this.props.currentSong.itemsOnCanvasCoordinates.map((item) => {
      let y1, y2; //переменные получения значения высоты
      // при совпадении ключа объекта в стейте и в heightValues

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === item.y1) {
          y1 = heightData[i];
        } else if (keys[i] === item.y2) {
          y2 = heightData[i];
        }
      }
      switch (item.type) {
        case "trapeze":
          //рисование трапеций
          return this.paintTrapeze(
            ctx,
            item.x1,
            y1,
            item.x2,
            item.x3,
            item.x4,
            y2
          );
        case "triangle":
          // рисование треугольников
          return this.paintTriangle(ctx, item.x1, y1, item.x2, y2, item.x3);
        case "circle":
          // рисование треугольников
          return this.paintCircle(ctx, item.x, y1, item.r);
        default:
          return null;
      }
    });
  }

  /////////////////////////////////////////////////////////////////////
  //Создание массива координат из точек, которые составляют линию, формирующую препятствие.
  saveLineCoordinates(x1: number, y1: number, x2: number, y2: number) {
    let A = [x1, y1];
    let B = [x2, y2];
    type ABType = Array<number>;
    function slope(a: ABType, b: ABType) {
      if (a[0] === b[0]) {
        return null;
      }
      return (b[1] - a[1]) / (b[0] - a[0]);
    }

    function intercept(point: any, slope: any) {
      if (slope === null) {
        // vertical line
        return point[0];
      }

      return point[1] - slope * point[0];
    }

    var m = slope(A, B);
    var b = intercept(A, m);

    for (let x = A[0]; x <= B[0]; x++) {
      let y = +(m = 0 * x + b).toFixed(0);
      this.state.allLinesCoordinatesArray.push({ x: x, y: y });
    }
  }

  ///////////////////////////////////////////////////////////////////
  // создание массива координат круга, который занимает птица в данный момент
  // (достаточно 8 точек по кругу)
  saveBirdCoordinatesArray(newx: number, newy: number, radius: number) {
    this.setState({ birdCoordinatesArray: [] }); //обнулить массив
    let centerX = newx;
    let centerY = newy;

    // an array to save your points
    let prevX = 0;
    let prevY = 0;
    for (let degree = 0; degree < 360; degree += 45) {
      let radians = (degree * Math.PI) / 180;
      let x = +(centerX + radius * Math.cos(radians)).toFixed(0);
      let y = +(centerY + radius * Math.sin(radians)).toFixed(0);
      if (x !== prevX && y !== prevY) {
        this.state.birdCoordinatesArray.push({ x: x, y: y });
        prevX = x;
        prevY = y;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //сравнение перекрытия координат препятствий и координат птицы

  compareObstacleAndBirdCoordinates(allLinesCoordinatesArray: any) {
    type CoordItemType = {
      x: number;
      y: number;
    };
    //координата в середине массива всегда минимальная
    let xBirdMin = this.state.birdCoordinatesArray[0]
      ? this.state.birdCoordinatesArray[
          +((this.state.birdCoordinatesArray.length - 1) / 2).toFixed(0)
        ].x
      : 75;

    //первая координата всегда максимальная
    let xBirdMax = this.state.birdCoordinatesArray[0]
      ? this.state.birdCoordinatesArray[0].x
      : 185;

    let acrossingCoordinatesArray: Array<CoordItemType> = [];

    // это цикл который считает только каждую третью координату препятствия
    // (для меньшей загрузки процессора)
    for (let i = 0; i < allLinesCoordinatesArray.length - 1; i += 1) {
      if (
        allLinesCoordinatesArray[i].x > xBirdMin &&
        allLinesCoordinatesArray[i].x < xBirdMax
      ) {
        //X двух массивов пересекаются
        acrossingCoordinatesArray.push(allLinesCoordinatesArray[i]);
      }
    }
    //Это если каждую координату считать
    // allLinesCoordinatesArray.forEach((currentCoordinate, index) => {
    //   if (currentCoordinate.x > xBirdMin && currentCoordinate.x < xBirdMax) {
    //     //X двух массивов пересекаются
    //     acrossingCoordinatesArray.push(currentCoordinate);
    //   }
    // });
    this.state.birdCoordinatesArray.forEach((currentCoordinate) => {
      for (let i = 0; i < acrossingCoordinatesArray.length - 1; i++) {
        if (currentCoordinate.y === acrossingCoordinatesArray[i].y) {
          //событие столкновения птицы и препятствия
          //console.log('СТОЛКНОВЕНИЕ');
          this.stopSigningAndMoving();
          this.playSoundExploisionStart();
          //console.log(`координата х птицы ${currentCoordinate.x}.
          // Координата х препятствия ${acrossingCoordinatesArray[i].x}`);
          //console.log(`координата y птицы ${currentCoordinate.y}.
          // Координата y препятствия ${acrossingCoordinatesArray[i].y}`);
        }
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  //проверка факта столкновения птицы с препятствием
  checkBirdFacedOnWall() {
    // сравнивает координаты птицы и препятствий и выдает сообщение о столкновении
    this.props.birdOnCanvas &&
      this.compareObstacleAndBirdCoordinates(
        this.state.allLinesCoordinatesArray
      );
  }

  // ///////////////////////////////////////////////////////////////////////
  // движение поля влево

  moveCanvasAndTextToLeft() {
    const canvas =
      this.props.canvas && this.props.canvas.clientHeight !== 0
        ? this.props.canvas
        : this.state.canvasRef;
    const textWrp =
      this.props.textWrp && this.props.textWrp.clientHeight !== 0
        ? this.props.textWrp
        : this.state.textWrpRef;
    let canvasWidth = canvas?.clientWidth; // ширина

    this.setState({ shiftTextToLeft: this.state.shiftTextToLeft - 1 }); //значение для сдвига текста на каждом шаге

    //начинаем увеличивать Х координату птицы относительно начала canvas с началом движения поля
    if (this.state.shiftTextToLeft <= 400) {
      this.setState({ xCoordOfBird: this.state.xCoordOfBird + 1 });
    }

    if (canvasWidth && Math.abs(this.state.shiftTextToLeft) < canvasWidth) {
      // Этосдвиг текста на каждом шаге
      textWrp?.setAttribute(
        "style",
        `marginLeft: ${this.state.shiftTextToLeft}px`
      );
      //textWrp.style.marginLeft = `${this.state.shiftTextToLeft}px`;

      // Это сдвиг поля на каждом шаге после того как текст поравняется с полем
      if (this.state.shiftTextToLeft <= 400) {
        canvas?.setAttribute(
          "style",
          `left: ${this.state.shiftTextToLeft - 400}px`
        );
        //canvas.style.left = `${this.state.shiftTextToLeft - 400}px`;
      }
      // служебная функция  если надо проверить точность положения птицы с ее координами в стейте
      // if (Math.abs(this.state.shiftTextToLeft) > 10000) {
      //   this.paintCircle(this.state.ctx, this.state.xCoordOfBird, this.state.yCoordOfBird, 35);
      // }
    }

    //остановка по нажатии СТОП.
    if (this.props.isStopBtnPushed) {
      this.stopSigningAndMoving();
    }
    //остановка в конце поля при пересечении линии финиш.
    else if (
      Math.abs(this.props.xCoordOfBird) > this.props.finishLineXCoordinate
    ) {
      this.stopSigningAndMoving();
      this.playSoundOfFinish();
    }

    // передаем X положения птицы в стейт
    this.sendChangingDataToState(this.state.xCoordOfBird);

    //проверяем не столкнулась ли птица с препятствием
    this.checkBirdFacedOnWall();
  }

  ////////////////////////////////////
  //сброс таймера settimeout-на движение поля
  clearTimer() {
    clearInterval(this.state.timerId);
    clearTimeout(this.state.moovingStartTimer);
    console.log("Таймер остановлен");
  }

  /////////////////////////////////////////////////////////////////////////
  //УПРАВЛЕНИЕ ЗВУКОМ И ОТРИСОВКОЙ ОДНОВРЕМЕННО
  ////////////////////////////////////////////////////////////////////////

  // ////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  stopSigningAndMoving() {
    const canvas =
      this.props.canvas && this.props.canvas.clientHeight !== 0
        ? this.props.canvas
        : this.state.canvasRef;
    const textWrp =
      this.props.textWrp && this.props.textWrp.clientHeight !== 0
        ? this.props.textWrp
        : this.state.textWrpRef;
    let speed = this.props.currentSong.playbackSpeed;
    this.playSongStop();
    this.clearTimer();
    canvas?.setAttribute("style", "left: 20px"); //возврат поля в начало
    //canvas.style.left = `20px`; //возврат поля в начало
    textWrp?.setAttribute("style", `marginLeft: ${speed * 3}px`); // возврат текста в исх позицию
    //textWrp.style.marginLeft = `${speed * 3}px`; // возврат текста в исх позицию
    this.setState({ shiftTextToLeft: speed * 3.5 }); //сброс счетчика сдвига текстового поля
    this.sendChangingDataToState(150, 0); //сброс массива координат прицы
  }

  // ////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения на текущем моменте
  pauseSigningAndMoving() {
    this.playSongPause();
    this.clearTimer();
  }

  // ////////////////////////////////////////////////////////////////////////
  // Запуск проигрывания и движения поля
  startSigningAndMoving(delay: number) {
    const delayMs = delay * 1000; //задержка движения текста и поля относительно музыки
    const playbackSpeed = this.props.currentSong.playbackSpeed;
    this.props.stopBtnIsPushSet(false);
    this.playSongStart();
    //если с начала, то текст с задержкой запускается
    this.setState({
      moovingStartTimer: setTimeout(this.runMoving, delayMs, playbackSpeed),
    });
  }

  ////////////////////////////////////////////////////
  //запуск движения поля и текста со скростью speed px/с
  runMoving(speed: number) {
    this.setState({
      timerId: setInterval(this.moveCanvasAndTextToLeft, 1000 / speed),
    });
    return this.state.timerId;
  }

  //////////////////////////////////////////////////////////
  //передача координат птицы (если они пришли) в глобальную переменную и потом в пропсы
  sendChangingDataToState(
    xCoordOfBird = this.state.xCoordOfBird,
    yCoordOfBird = this.state.yCoordOfBird
  ) {
    this.setState({ xCoordOfBird: xCoordOfBird });
    this.setState({ yCoordOfBird: yCoordOfBird });
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
          birdRefGetter={this.birdRefGetter}
          songVolumeInputRefGetter={this.songVolumeInputRefGetter}
          voiceVolumeInputRefGetter={this.voiceVolumeInputRefGetter}
          soundExploisionRefGetter={this.soundExploisionRefGetter}
          soundOfFinishRefGetter={this.soundOfFinishRefGetter}
          stopSigningAndMoving={this.stopSigningAndMoving}
          startSigningAndMoving={this.startSigningAndMoving}
          isCurrentSongPlaying={this.props.isCurrentSongPlaying}
          xCoordOfBird={this.state.xCoordOfBird}
          changeVolumeOfSong={this.changeVolumeOfSong}
          changeVolumeOfVoice={this.changeVolumeOfVoice}
          {...this.props}
        />
      </div>
    );
  }
}

type MapStateToPropsType = {
  maxUserVoiceLevel: number;
  isSetMaxUserVoiceLevel: boolean;
  currentSong: SongType;
  songs: Array<SongType>;
  adv7: AdvertismentType;
  adv8: AdvertismentType;
  isStopBtnPushed: boolean;
  canvas: null | HTMLElement;
  canvasWrp: null | HTMLElement;
  textWrp: null | HTMLElement;
  songMP3: null | HTMLAudioElement;
  birdOnCanvas: null | HTMLElement;
  isCurrentSongPlaying: boolean;
  xCoordOfBird: number;
  yCoordOfBird: number;
  soundExploision: null | HTMLAudioElement;
  soundOfFinish: null | HTMLAudioElement;
  srcToSoundExploision: string;
  srcToSoundOfFinish: string;
  srcTofinishLineImg: string;
  finishLineXCoordinate: number;
  currentSongVolume: number;
  currentVoiceVolume: number;
  currentLanguage: "ru" | "en";
};

type MapDispatchToPropsType = {
  saveDOMElementToState: (
    DOMelement: HTMLElement | HTMLAudioElement | HTMLCanvasElement,
    elementName: string
  ) => void;
  stopBtnIsPushSet: (isBtnPushed: boolean) => void;
  isCurrentSongPlayingSetter: (isCurrentSongPlaying: boolean) => void;
  sendChangingMoveDataToState: (
    xCoordOfBird: number,
    yCoordOfBird: number
  ) => void;
  setNewVolumeOfSong: (newVolume: number) => void;
  setNewVolumeOfVoice: (newVolume: number) => void;
  currentLanguageToggle: (lang: "ru" | "en") => void;
};

type OwnPropsType = {
  canvasRefGetter: any;
  canvasWrpRefGetter: any;
  songMP3RefGetter: any;
  textWrpRefGetter: any;
  birdRefGetter: any;
  songVolumeInputRefGetter: any;
  voiceVolumeInputRefGetter: any;
  soundExploisionRefGetter: any;
  soundOfFinishRefGetter: any;
  stopSigningAndMoving: any;
  startSigningAndMoving: any;
  isCurrentSongPlaying: any;
  xCoordOfBird: any;
  changeVolumeOfSong: any;
  changeVolumeOfVoice: any;
};

type SongPlayPageContainerPropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  OwnPropsType;

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  maxUserVoiceLevel: getMaxUserVoiceLevel(state),
  isSetMaxUserVoiceLevel: getIsSetMaxUserVoiceLevel(state),
  currentSong: getcurrentSongSelector(state),
  songs: getSongsSelector(state),
  adv7: getAdv(state, 7),
  adv8: getAdv(state, 8),
  isStopBtnPushed: getIsStopBtnPushed(state),
  canvas: getCanvas(state),
  canvasWrp: getCanvasWrp(state),
  textWrp: getTextWrp(state),
  songMP3: getSongMP3(state),
  birdOnCanvas: getBirdOnCanvas(state),
  isCurrentSongPlaying: getIsCurrentSongPlayingSetter(state),
  xCoordOfBird: getXCoordOfBird(state),
  yCoordOfBird: getYCoordOfBird(state),
  soundExploision: getSoundExploision(state),
  soundOfFinish: getSoundOfFinish(state),
  srcToSoundExploision: getSrcToSoundExploision(state),
  srcToSoundOfFinish: getSrcToSoundOfFinish(state),
  srcTofinishLineImg: getSrcTofinishLineImg(state),
  finishLineXCoordinate: getFinishLineXCoordinate(state),
  currentSongVolume: getCurrentSongVolume(state),
  currentVoiceVolume: getCurrentVoiceVolume(state),
  currentLanguage: getCurrentLanguage(state),
});

export default compose(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    saveDOMElementToState,
    stopBtnIsPushSet,
    isCurrentSongPlayingSetter,
    sendChangingMoveDataToState,
    setNewVolumeOfSong,
    setNewVolumeOfVoice,
    currentLanguageToggle,
  })
)(SongPlayPageContainer);
