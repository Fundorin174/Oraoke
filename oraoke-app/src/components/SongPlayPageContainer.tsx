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

type CoordinatesType = {
  x: number;
  y: number;
};

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
  allLinesCoordinatesArray: Array<CoordinatesType>;
  birdCoordinatesArray: Array<CoordinatesType>;
  voiceArray: null | Uint8Array;
  numOfItemsInVoiceArray: number;
  analyser: any;
  flying: number;
  ctx: CanvasRenderingContext2D | undefined;
  canvasHeight: number;
  timerId: any;
  moovingStartTimer: any;
  shiftTextToLeft: number;
  xCoordOfBird: number;
  yCoordOfBird: number;
  autoPlaySong: any;
  isCanvasHeightSet: number;
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
      isCanvasHeightSet: 0,
    };
    // this.window = window; this.canvasRef = null; this.canvasWrpRef = null;
    // //////////////////////// Забиндить this для всех методов где это надо
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
    this.setXCoordinateToState = this.setXCoordinateToState.bind(this);
    this.setYCoordinateToState = this.setYCoordinateToState.bind(this);
    this.mooveBirdByVoice = this.mooveBirdByVoice.bind(this);
    this.createBirdCoordinatesArray = this.createBirdCoordinatesArray.bind(
      this
    );
    this.playSoundExploisionStart = this.playSoundExploisionStart.bind(this);
    this.changeVolumeOfSong = this.changeVolumeOfSong.bind(this);
    this.changeVolumeOfVoice = this.changeVolumeOfVoice.bind(this);
    this.addZeroValuesInAllLinesCoordinatesArray = this.addZeroValuesInAllLinesCoordinatesArray.bind(this);

    // ////////////////////////////////////// ref calback to DOM elements
    this.canvasRefGetter = (canvasEl: HTMLCanvasElement) => {
      this.setState((state) => {
        return { canvasRef: canvasEl };
      });
      this.props.saveDOMElementToState(canvasEl, "canvas");
    };
    this.canvasWrpRefGetter = (canvasWrpEl: HTMLElement) => {
      this.setState({ canvasWrpRef: canvasWrpEl });
      this.props.saveDOMElementToState(canvasWrpEl, "canvasWrp");
    };
    this.songMP3RefGetter = (el: HTMLAudioElement) => {
      this.setState({ songMP3Ref: el });
      this.props.saveDOMElementToState(el, "songMP3");
    };
    this.textWrpRefGetter = (el: HTMLElement) => {
      this.setState({ textWrpRef: el });
      this.props.saveDOMElementToState(el, "textWrp");
    };
    this.birdRefGetter = (el: HTMLElement) => {
      this.setState({ birdRef: el });
      this.props.saveDOMElementToState(el, "birdOnCanvas");
    };
    this.soundExploisionRefGetter = (el: HTMLAudioElement) => {
      this.setState({ soundExploisionRef: el });
      this.props.saveDOMElementToState(el, "soundExploision");
    };
    this.soundOfFinishRefGetter = (el: HTMLAudioElement) => {
      this.setState({ soundOfFinishRef: el });
      this.props.saveDOMElementToState(el, "soundOfFinish");
    };
  }

  canvasRefGetter(canvasEl: HTMLCanvasElement) { }
  canvasWrpRefGetter = (canvasWrpEl: HTMLElement) => { };
  songMP3RefGetter = (el: HTMLAudioElement) => { };
  textWrpRefGetter = (el: HTMLElement) => { };
  birdRefGetter = (el: HTMLElement) => { };
  soundExploisionRefGetter = (el: HTMLAudioElement) => { };
  soundOfFinishRefGetter = (el: HTMLAudioElement) => { };

  // ///////////////////////////////////////////////////////////////////////////
  // ////////
  componentDidMount() {
    //перезагрузка страницы при изменении размеров окна браузера
    //window.addEventListener("resize", () => window.location.reload());

    //Запуск проигрывания файла через 4 секунды
    const autoPlaySong =
      !this.props.isCurrentSongPlaying &&
      setTimeout(
        this.startSigningAndMoving,
        1000,
        this.props.currentSong.startMovingDelay
      );

    this.setState({ autoPlaySong: autoPlaySong });

    document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // /////////
  //@ts-ignore
  componentDidUpdate(
    prevProps: SongPlayPageContainerPropsType,
    prevState: AppStateType
  ) {
    if (
      this.props.canvas?.clientHeight !== 0 &&
      (prevProps.canvas === null || prevProps.canvasWrp === null)
    ) {
      this.setCanvasHeigthAndWidth(); //изменение высоты canvas по родителю
    }

    if (this.state.canvasHeight !== 0 && this.state.isCanvasHeightSet === 1) {
      //Отрисовка всего поля canvas
      this.paintingCanvasField();

      this.setState((state) => {
        return {
          isCanvasHeightSet: state.isCanvasHeightSet + 1,
        };
      });
    }
    // Нажатие на кнопку СТОП - возврат к началу
    if (
      this.props.isStopBtnPushed &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.playSongStop();
      this.setXCoordinateToState(150); //сброс массива координат прицы 
      this.setYCoordinateToState(0); //сброс массива координат прицы 
    }
    //нажатие на кнопку старт при перезапуске песни.
    if (
      !this.props.isStopBtnPushed &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.mooveBirdByVoice();
      this.setXCoordinateToState(150); //сброс массива координат прицы 
      this.setYCoordinateToState(0); //сброс массива координат прицы 
    }
  }

  // ///////////////////////////////////////////////////////////////////////////
  // /////////
  componentWillUnmount() {
    window.removeEventListener("resize", this.setCanvasHeigthAndWidth);
    document.removeEventListener("keyup", this.playPauseOnSpaseBtn);
    clearTimeout(this.state.autoPlaySong);
    this.stopBirdFlying();
  }

  // ////////////////////////////////////////////////////////////////////// РАБОТА
  // С МУЗЫКОЙ
  // ///////////////////////////////////////////////////////////////////// toggle
  // isCurrentSongPlaing
  isCurrentSongPlayingSet(isCurrentSongPlaying: boolean) {
    this.props.isCurrentSongPlayingSetter(isCurrentSongPlaying);
  }

  // ////////////////////////////////////////////////////////////////////// Запуск
  // фоновой песни
  playSongStart() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
    audio.volume = this.props.currentSongVolume; // получение громкости из props
    // в зависимости от инпута
    audio.play();
    this.isCurrentSongPlayingSet(true);
  }

  // ///////////////////////////////////////////////////////////////////////
  // Запуск звука взрыва при столкновении
  playSoundExploisionStart() {
    const soundExploision = this.state.soundExploisionRef as HTMLAudioElement;
    soundExploision.play();
  }

  // ////////////////////////////////////////////////////////////////////// запуск
  // зпобедных фанфар при прохождении до конца
  playSoundOfFinish() {
    const soundOfFinish = this.state.soundOfFinishRef;
    soundOfFinish?.play();
  }

  // //////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни и отправка к началу
  playSongStop() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
    this.isCurrentSongPlayingSet(false);
  }

  // //////////////////////////////////////////////////////////////////////
  // Остановка фоновой песни на текущем месте
  playSongPause() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
    audio.pause();
    this.isCurrentSongPlayingSet(false);
  }

  // /////////////////////////////////////////////////////////////////////// Пауза
  // на текущем месте при нажатии клавиш "Space" (служебная функция без remoove)

  playPauseOnSpaseBtn(event: any) {
    event.preventDefault();
    if (event.code === "Space" && this.props.isCurrentSongPlaying) {
      this.pauseSigningAndMoving();
    } else if (event.code === "Space" && !this.props.isCurrentSongPlaying) {
      this.startSigningAndMoving(0);
    }
  }

  // ////////////////////////////////////////////////////////////////////////////
  // изменение громкости музыки
  changeVolumeOfSong(value: any) {
    this.props.setNewVolumeOfSong(value.target.value);
  }

  // ////////////////////////////////////////////////////////////////////////
  // изменение громкости голоса
  changeVolumeOfVoice(value: any) {
    this.props.setNewVolumeOfVoice(value.target.value);
  }

  // ////////////////////////////////////////////////////////////////////////////
  // движение птицы в зависимости от звука с микрофона
  mooveBirdByVoice() {
    const birdOnCanvas = this.state.birdRef as HTMLElement;

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
        // рекурсивная функция обработки принятого звука с частотой примерно 60 раз в
        // секугду
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
          // console.log(`текущее: ${averageHeight} максимальное: ${maxHeightForWile}
          // Итоговое: ${birdFlyingHigh}. Общая высота ${canvasHeight} `); если очередное
          // значение отличается от предыдущего больше чем на 2 то уменьшаем разницу до 1.
          // Чтобы убрать резкие скачки.
          if (
            birdFlyingHigh - prevbirdFlyingHigh > 2 &&
            birdFlyingHigh - prevbirdFlyingHigh > 0
          ) {
            birdFlyingFinish = Math.round(prevbirdFlyingHigh) + 1 + 70 + "px";
          } else if (
            Math.abs(birdFlyingHigh - prevbirdFlyingHigh) > 2 &&
            birdFlyingHigh - prevbirdFlyingHigh < 0
          ) {
            birdFlyingFinish = Math.round(prevbirdFlyingHigh) - 1 + 70 + "px";
          } else {
            birdFlyingFinish = Math.round(birdFlyingHigh) + 70 + "px";
          }

          //записать текущее значение в предыдущее для сравнения на следующем шаге
          prevbirdFlyingHigh = birdFlyingHigh;

          //changing bottom - and fly. сдвиг птицы на высоту birdFlyingFinish))
          birdOnCanvas &&
            birdOnCanvas.setAttribute("style", `bottom: ${birdFlyingFinish}`);
          // birdOnCanvas && birdOnCanvas.style.bottom = birdFlyingFinish; Обновляем
          
          // значение высоты подъема птицы 
          let currentYCoordinatOfBird = this.props.canvas
              ? Math.round(canvasHeight - birdFlyingHigh - birdHeigth / 2)
              : Math.round(canvasHeight - birdHeigth / 2); //текущая Y коорината центра птицы
          
          //Обновляем значение высоты птицы в локальном стейте
          this.setYCoordinateToState(currentYCoordinatOfBird);
          
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

  // /////////////////////////////////////////////////////////////////////// сброс
  // птицы в начальное состояние
  stopBirdFlying() {
    cancelAnimationFrame(this.state.flying);
    this.props.birdOnCanvas?.setAttribute("style", `bottom: 70px`);
    this.state.analyser && this.state.analyser.disconnect();
    this.setState({ birdCoordinatesArray: [], flying: 0 });
  }

  // //////////////////////////////////////////////////////////////////////////
  // Создание массива координат птицы на данный момемнт
  createBirdCoordinatesArray(birdHeigth: number) {
    let xCoordOfBird = this.state.xCoordOfBird; //положение центра птицы по Х
    let yCoordOfBird = this.state.yCoordOfBird; //положение центра птицы по Y

    // функция передачи координат птицы и радиуса ее окружности
    this.saveBirdCoordinatesArray(xCoordOfBird, yCoordOfBird, birdHeigth / 2);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // //// РАБОТА С ГРАФИКОЙ
  // /////////////////////////////////////////////////////////////////////////////////
  // изменение высоты canvas
  setCanvasHeigthAndWidth() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const canvasWrp = this.state.canvasWrpRef;

    //устанавливаем высоту планшета на 80 px меньше родителя (80 для текста)
    let canvasHeight = canvasWrp ? canvasWrp.clientHeight - 80 : 0;
    canvas && canvas.setAttribute("height", `${canvasHeight}px`);
    //    canvas && canvas.height = `${canvasHeight}px`;
    this.setState({
      canvasHeight: canvasHeight,
    });
    //this.state.canvasHeight = canvasHeight; выссота установлена
    this.setState((state) => {
      return {
        isCanvasHeightSet: state.isCanvasHeightSet + 1,
      };
    });
  }

  // /////////////////////////////////////////////////////////////////////////
  // рисование треугольника
  paintTriangle(
    ctx: CanvasRenderingContext2D, //контекст
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
    ctx: CanvasRenderingContext2D, //контекст
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
    ctx: CanvasRenderingContext2D, //контекст
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
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // ////////////////////////////////////////////////////////////////////////////
  // отрисовка всего canvas
  paintingCanvasField() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;

    let canvasHeight = this.state.canvasHeight; //высота

    if (canvas && canvas.height !== canvasHeight) {
      canvas.setAttribute("height", `${canvasHeight}`);
    } //Устанавливаем реальную высоту канвас чтоб изображение не растягивалось
    // canvas.width = canvas.offsetWidth; Чтобы изображение не растягивалось
    // получение контекста canvas
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.setState({ ctx: ctx });

    //рисование Создаем объект изображения финишной линии
    let finishLineImg = new Image();

    // Привязываем функцию к событию onload Рисуем финишную ленту, когда она
    // загружена с шириной 50 и высотой canvasHeight в координатах
    // finishLineXCoordinate, 0
    finishLineImg.onload = () => {
      ctx?.drawImage(
        finishLineImg,
        this.props.finishLineXCoordinate,
        0,
        50,
        canvasHeight
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
    let heightData = [] as Array<number>;

    //разбиваем heightValues на массив ключей и массив значений
    heightValues.forEach((item: any, i: number) => {
      let key = Object.keys(item);
      keys.push(key[0]); //названия значений высот для сравнения со значением в стейте
      heightData.push(item[key[0]]); //значение высот в пикселях
    });

    // ////////////////////////////////////////////////////////////////////
    // Автоматическое рисование фигур на основе данных из стейта
    this.props.currentSong.itemsOnCanvasCoordinates.map((item) => {
      let y1 = 0,
        y2 = 0; //переменные получения значения высоты
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

//вызов функции дабавляющей в массив из препятствий пустые значения, чтобы в нем было значение для каждого X
    this.addZeroValuesInAllLinesCoordinatesArray();

  }

  // /////////////////////////////////////////////////////////////////// Создание
  // массива координат из точек, которые составляют линию, формирующую
  // препятствие.
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

    var m = slope(A, B) as number;
    var b = intercept(A, m);
    //сохраняем координату линии через каждый 1 px
    for (let x = A[0]; x <= B[0]; x += 1) {
      let y = Math.round(+(m * x + b));
      //добавляем элемент в массив если только предыдущий элемент не на той же x координате

      if (this.state.allLinesCoordinatesArray.length === 0)  {this.state.allLinesCoordinatesArray.push({ x: x, y: y }) }
      else if (this.state.allLinesCoordinatesArray[this.state.allLinesCoordinatesArray.length-1].x !==x) {
        this.state.allLinesCoordinatesArray.push({ x: x, y: y })
      } 
              
    }
  }

  // /////////////////////////////////////////////////////////////////// 
  //Добаввление в массив координат из точек, которые составляют линию, формирующую
  // препятствие. пустых значений, чтобы номер элемента в массиве allLinesCoordinatesArray
  // соответствовал значению X.(для этого не должно быть препятствий одновременно сверху и снизу )
  addZeroValuesInAllLinesCoordinatesArray(){

    for (let i=0; i < this.props.currentSong.canvasWigth; i++) {
     
      let zeroElem = this.state.allLinesCoordinatesArray.find( currentcoordinata => {
        return i == currentcoordinata.x
      });
      if (!zeroElem) {
        this.state.allLinesCoordinatesArray.splice(i, 0, {x: i, y: -1})
      }
    }
  }


  // ///////////////////////////////////////////////////////////////// создание
  // массива координат круга, который занимает птица в данный момент (достаточно 5
  // точек)
  saveBirdCoordinatesArray(newx: number, newy: number, radius: number) {
    this.setState({ birdCoordinatesArray: [] }); //обнулить массив
    let centerX = newx;
    let centerY = newy;
    let coord1 = {x: newx, y: newy},
        coord2 = {x: newx-radius, y: newy},
        coord3 = {x: newx, y: newy-radius},
        coord4 = {x: newx + radius, y: newy},
        coord5 = {x: newx, y: newy+radius};
        
      this.state.birdCoordinatesArray.push(coord1, coord2, coord3, coord4, coord5);
    // an array to save your points
    // let prevX = 0;
    // let prevY = 0;
    // for (let degree = 0; degree < 360; degree += 90) {
    //   let radians = (degree * Math.PI) / 180;
    //   let x = Math.round(centerX + radius * Math.cos(radians));
    //   let y = Math.round(centerY + radius * Math.sin(radians));
    //   if (x !== prevX && y !== prevY) {
    //     this.state.birdCoordinatesArray.push({ x: x, y: y });
    //     prevX = x;
    //     prevY = y;
    //   }
    // }
  }

  // ////////////////////////////////////////////////////////////////////////////
  // сравнение перекрытия координат препятствий и любой из координат птицы

  compareObstacleAndBirdCoordinates() {    
    
    this.state.birdCoordinatesArray.forEach((currentBirdCoordinate)=>{
 
      let i = currentBirdCoordinate.x
      if ((this.state.allLinesCoordinatesArray[i].x >= currentBirdCoordinate.x-2 &&
           this.state.allLinesCoordinatesArray[i].x <= currentBirdCoordinate.x+2 
        ) && 
        (this.state.allLinesCoordinatesArray[i].y >= currentBirdCoordinate.y-2 &&
         this.state.allLinesCoordinatesArray[i].y <= currentBirdCoordinate.y+2)){
          //СТОЛКНОВЕНИЕ
          // this.stopSigningAndMoving();
          // this.playSoundExploisionStart();          
      }
 
  })
}

  // /////////////////////////////////////////////////////////////////////
  // движение поля влево

  moveCanvasAndTextToLeft() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;

    let canvasWidth = canvas.clientWidth; // ширина
    
    //@ts-ignore -Это не правильно! Надо через setState,
    //но мать его тогда программа начинает жутко тупить и поле двигается не равномерно
    this.state.shiftTextToLeft -= 2; //сдвиг текста на каждом шаге на 2 px
    // this.setState((state) => ({
    //   shiftTextToLeft: state.shiftTextToLeft - 2,
    // }));
    
    // //проверяем не столкнулась ли птица с препятствием
    this.compareObstacleAndBirdCoordinates();  


    //начинаем увеличивать Х координату птицы относительно начала canvas
    //с началом движения поля с шагом 2 px
    if (this.state.shiftTextToLeft <= 400) {
      // передаем X положения птицы в стейт
    this.setXCoordinateToState(this.state.xCoordOfBird+2);
    }

    if (canvasWidth && Math.abs(this.state.shiftTextToLeft) < canvasWidth) {
      // Этосдвиг текста на каждом шаге
      textWrp.setAttribute(
        "style",
        `margin-left: ${this.state.shiftTextToLeft}px`
      );
      // textWrp.style.marginLeft = `${this.state.shiftTextToLeft}px`; Это сдвиг поля
      // на каждом шаге после того как текст поравняется с полем
      if (this.state.shiftTextToLeft <= 400) {
        // canvas.setAttribute(
        //   "style",
        //   `left: ${this.state.shiftTextToLeft - 400}px`
        // );
        canvas.style.left = `${this.state.shiftTextToLeft - 400}px`;
      }
      // служебная функция  если надо проверить точность положения птицы с ее
      // координами в стейте
      // if (Math.abs(this.state.shiftTextToLeft) > 1000) {
      //   //@ts-ignore
      //   this.paintCircle(
      //     //@ts-ignore
      //     this.state.ctx,
      //     this.state.xCoordOfBird,
      //     this.state.yCoordOfBird,
      //     35
      //   );
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




  }

  //////////////////////////////////// сброс таймера settimeout-на движение поля
  clearTimer() {
    clearInterval(this.state.timerId);
    clearTimeout(this.state.moovingStartTimer);
    // console.log("Таймер остановлен");
  }

  // ///////////////////////////////////////////////////////////////////////
  // УПРАВЛЕНИЕ ЗВУКОМ И ОТРИСОВКОЙ ОДНОВРЕМЕННО
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  stopSigningAndMoving() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;
    let speed = this.props.currentSong.playbackSpeed;
    this.playSongStop();
    this.clearTimer();
    this.stopBirdFlying();
    canvas.setAttribute("style", "left: 20px"); //возврат поля в начало
    //canvas.style.left = `20px`; возврат поля в начало
    textWrp.setAttribute("style", `margin-left: ${speed * 3}px`); // возврат текста в исх позицию
    //textWrp.style.marginLeft = `${speed * 3}px`;  возврат текста в исх позицию
    this.setState({
      shiftTextToLeft: speed * 3.5,
    }); //сброс счетчика сдвига текстового поля
    this.setXCoordinateToState(150); //сброс массива координат прицы
    this.setYCoordinateToState(0); //сброс массива координат прицы

  }

  // //////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения на текущем моменте
  pauseSigningAndMoving() {
    this.playSongPause();
    this.clearTimer();
  }

  // ////////////////////////////////////////////////////////////////////// Запуск
  // проигрывания и движения поля
  startSigningAndMoving(delay: number) {
    const delayMs = delay * 1000; //задержка движения текста и поля относительно музыки
    const playbackSpeed = this.props.currentSong.playbackSpeed;
    this.props.stopBtnIsPushSet(false);
    this.playSongStart();
    // // запуск проверки на столкновение птицы и препятствия
    // this.checkBirdFacedOnWall();
    // запуск подъема птицы в зависимости от уровня голоса с микрофона
    this.mooveBirdByVoice();
    //если с начала, то текст с задержкой запускается
    this.setState({
      moovingStartTimer: setTimeout(this.runMoving, delayMs, playbackSpeed),
    });
  }

  // ////////////////////////////////////////////////// запуск движения поля и
  // текста со скростью speed px/с

  runMoving(speed: number) {
    this.setState({
      timerId: setInterval(this.moveCanvasAndTextToLeft, 1000 / speed),
    });
    return this.state.timerId;
  }

  // //////////////////////////////////////////////////////// передача координат
  // птицы (если они пришли) в глобальную переменную и потом в пропсы
  // sendChangingDataToState(xCoordOfBird:number, yCoordOfBird:number) {
  //   this.setState({ xCoordOfBird: xCoordOfBird });
  //   this.setState({ yCoordOfBird: yCoordOfBird });
  //   this.props.sendChangingMoveDataToState(xCoordOfBird);
  //   console.log('x:'+this.state.xCoordOfBird)
  //   console.log('y:'+this.state.yCoordOfBird)
  // }

  setXCoordinateToState(xCoordOfBird:number){
    this.setState({ xCoordOfBird: xCoordOfBird });
    this.props.sendChangingMoveDataToState(xCoordOfBird);
  }
  
  setYCoordinateToState(yCoordOfBird:number){
    this.setState({ yCoordOfBird: yCoordOfBird });
  }
  
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
        {" "}
        <SongPlayPage
          canvasRefGetter={this.canvasRefGetter}
          canvasWrpRefGetter={this.canvasWrpRefGetter}
          songMP3RefGetter={this.songMP3RefGetter}
          textWrpRefGetter={this.textWrpRefGetter}
          birdRefGetter={this.birdRefGetter}
          soundExploisionRefGetter={this.soundExploisionRefGetter}
          soundOfFinishRefGetter={this.soundOfFinishRefGetter}
          stopSigningAndMoving={this.stopSigningAndMoving}
          startSigningAndMoving={this.startSigningAndMoving}
          isCurrentSongPlaying={this.props.isCurrentSongPlaying}
          xCoordOfBird={this.state.xCoordOfBird}
          changeVolumeOfSong={this.changeVolumeOfSong}
          changeVolumeOfVoice={this.changeVolumeOfVoice}
          {...this.props}
        />{" "}
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
    xCoordOfBird: number
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
