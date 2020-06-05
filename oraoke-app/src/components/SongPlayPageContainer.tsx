import React from "react";
import SongPlayPage from "./SongPlayPage";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getMaxUserVoiceLevel,
  getIsSetMaxUserVoiceLevel,
  getSensibilityOfFly
} from "../redux/settingsPageSelectors";
import {
  getcurrentSongSelector,
  getSongsSelector,
  getIsStopBtnPushed,
  getIsCurrentSongPlayingSetter,
  getSrcToSoundExploision,
  getSrcToSoundOfFinish,
  getSrcTofinishLineImg,
  getFinishLineXCoordinate,
  getCurrentSongVolume,
  getCurrentVoiceVolume,
  getCurrentLanguage,
  getLanguagesJSONData,
  getAdv
} from "../redux/startPageSelectors";
import {
  stopBtnIsPushSet,
  isCurrentSongPlayingSetter,
  setNewVolumeOfSong,
  setNewVolumeOfVoice,
  currentLanguageToggle,
  SongType,
} from "../redux/startPageReduser";
import { AdvertismentType } from "../redux/startPageReduser";
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
  flying: any;
  ctx: CanvasRenderingContext2D | undefined;
  canvasHeight: number;
  moovingStartTimer: any;
  shiftTextToLeft: number;
  xCoordOfBird: number;
  yCoordOfBird: number;
  isCanvasHeightSet: number;
  prevbirdFlyingHigh: number | undefined;
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
      moovingStartTimer: 0, //SetTimeout задержки запуска движения относительно музыки
      shiftTextToLeft: 550, //начальная точка сдвига текста
      xCoordOfBird: 150, //начальное положение птицы по оси х меняется
      // в функции moveCanvasAndTextToLeft
      yCoordOfBird: 50, //начальное положение птицы по оси y
      //меняется в функции mooveBirdByVoice
      isCanvasHeightSet: 0,
      prevbirdFlyingHigh: undefined
    };

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
    this.moveBirdToUp = this.moveBirdToUp.bind(this);

    // ////////////////////////////////////// ref calback to DOM elements
    this.canvasRefGetter = (canvasEl: HTMLCanvasElement) => {
      this.setState((state) => {
        return { canvasRef: canvasEl };
      });
    };
    this.canvasWrpRefGetter = (canvasWrpEl: HTMLElement) => {
      this.setState({ canvasWrpRef: canvasWrpEl });
    };
    this.songMP3RefGetter = (el: HTMLAudioElement) => {
      this.setState({ songMP3Ref: el });
    };
    this.textWrpRefGetter = (el: HTMLElement) => {
      this.setState({ textWrpRef: el });
    };
    this.birdRefGetter = (el: HTMLElement) => {
      this.setState({ birdRef: el });
    };
    this.soundExploisionRefGetter = (el: HTMLAudioElement) => {
      this.setState({ soundExploisionRef: el });
    };
    this.soundOfFinishRefGetter = (el: HTMLAudioElement) => {
      this.setState({ soundOfFinishRef: el });
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
    window.addEventListener("resize", () => window.location.reload());

    //ыднжебная функция для создания трасс
    document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // /////////
  componentDidUpdate(prevProps: SongPlayPageContainerPropsType) {
    // Установка высоты canvas после получения элементов DOM
    if (
      this.state.canvasRef?.clientHeight !== 0 &&
      this.state.isCanvasHeightSet === 0
    ) {
      this.setCanvasHeigthAndWidth(); //изменение высоты canvas по родителю
    }

    if (this.state.canvasHeight !== 0 && this.state.isCanvasHeightSet === 1) {
      //Отрисовка всего поля canvas после задания его размеров
      this.paintingCanvasField();
      //увеличение счетчика для выхода из рекурсии
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
      this.stopSigningAndMoving();
    }
    //нажатие на кнопку старт при запуске песни.
    if (
      !this.props.isStopBtnPushed && !this.props.isCurrentSongPlaying &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.startSigningAndMoving();
    }
  }

  // ///////////////////////////////////////////////////////////////////////////
  // /////////
  componentWillUnmount() {
    window.removeEventListener("resize", this.setCanvasHeigthAndWidth);
    document.removeEventListener("keyup", this.playPauseOnSpaseBtn);
    this.stopSigningAndMoving();
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
      this.startSigningAndMoving();
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
    //создание массива для записи голоса с микрофона
    this.setState({
      voiceArray: new Uint8Array(this.state.numOfItemsInVoiceArray),
    });

    //@ts-ignore
    let context = new (window.AudioContext || window.webkitAudioContext)(); //аудиоконтекст WEB AudioAPI
    let analyser = context.createAnalyser();//создание аналайзера
    let gainNode = context.createGain(); //создание усилительного узла
    const delay = this.props.currentSong.startMovingDelay * 1000;//задержка начала проигрывания музыки

    this.setState({ analyser: analyser }); //передаем данные в глобальную переменную для сброса

    //получаем поток с микрофона и работаем с ним
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let srcOfVoice = context.createMediaStreamSource(stream);
        srcOfVoice.connect(analyser); //передача звука в аналайзер
        analyser.connect(gainNode); //включение усилителя перед колонками
        gainNode.connect(context.destination); //вывод звука c усилителя на колонки
        //усиление/ослабление исходного звука
        // в зависимости от инпута через стейт звука
        gainNode.gain.setValueAtTime(
          +this.props.currentVoiceVolume,
          context.currentTime
        );

        let birdFlyingFinish = '';
        // запуск полета птицы с задержкой
        let moovingStartTimer = setTimeout(this.moveBirdToUp, delay, birdFlyingFinish);

        this.setState({
          moovingStartTimer: moovingStartTimer
        });


      })
      .catch((error) => {
        alert(
          error + "\r\n Отклонено. Перезагрузите страницу!"
        );
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //repeating method to mooving bird on vertical axe depends from the voice level from microfon
  moveBirdToUp(birdFlyingFinish: string) {
    const playbackSpeed = this.props.currentSong.playbackSpeed;
    const birdOnCanvas = this.state.birdRef as HTMLElement;
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const birdHeigth = birdOnCanvas?.clientHeight; //высота птицы
    const canvasHeight = canvas?.clientHeight;
    // это если калибровать
    // const maxHeightForWhile = this.props.isSetMaxUserVoiceLevel
    //   ? this.props.maxUserVoiceLevel
    //   : 255;

    const loop = () => {
      this.state.voiceArray &&
        this.state.analyser.getByteFrequencyData(this.state.voiceArray); //получение данных частот


      // Получение усредненного значения звука по всем частотам - это и будет текущее
      // значение уровня звука
      //сортируем элементы в массиве по убыванию
      let sortArray = this.state.voiceArray?.sort(function (a, b) {
        return b - a;
      }) as Uint8Array;

      //возвращает среднее значение numOfItems максимальных элементов в массиве
      //(numOfItems меняется на странице настроек, от него зависит чувствительность микрофона)
      let takeAverageHeight = (numOfItems: number, sortArray: Uint8Array): number | undefined => {
        let averageHeight = 0;
        for (let i = 0; i < numOfItems; i++) {
          averageHeight += sortArray[i] / numOfItems
        }
        return averageHeight
      }

      let averageHeight = takeAverageHeight(this.props.sensibilityOfFly, sortArray) as number;

      let prevbirdFlyingHigh = this.state.prevbirdFlyingHigh ? this.state.prevbirdFlyingHigh : 0;

      //коэфициент количества пикселей canvasa в одной единице высоты.(макс - 255)
      let coefFromCanvasHeight = canvasHeight / 255;

      //перевод значения высоты птицы в пиксели
      let birdFlyingHigh = averageHeight * coefFromCanvasHeight;
      //сдвиг птицы относительно низа birdMainWrp равен ее высоте
      let marginTop = birdHeigth;
      // перевод в строку с учетом marginTop, так как для птицы 
      //родительский элемент не canvas а canvasWrp 
      // расчет высоты подъема птицы в px. если очередное
      // значение отличается от предыдущего больше чем на 2 то уменьшаем разницу до 0,2.
      //Чтобы убрать резкие скачки.
      if (
        //птица резко поднимается
        birdFlyingHigh - prevbirdFlyingHigh > 2 &&
        birdFlyingHigh - prevbirdFlyingHigh > 0 &&
        birdFlyingHigh >= marginTop
      ) {
        birdFlyingFinish = Math.round(prevbirdFlyingHigh) + 0.2 + "px";
      } else if (
        //птица резко опускается
        Math.abs(birdFlyingHigh - prevbirdFlyingHigh) > 2 &&
        birdFlyingHigh - prevbirdFlyingHigh < 0 &&
        birdFlyingHigh >= marginTop
      ) {
        birdFlyingFinish = Math.round(prevbirdFlyingHigh) - 0.2 + "px";
      } else if (birdFlyingHigh >= marginTop) {
        //птица летит плавно
        birdFlyingFinish = birdFlyingHigh + "px";
      } else {
        //птица внизу
        birdFlyingFinish = marginTop + "px";
      }

      //записать текущее значение в предыдущее для сравнения на следующем шаге
      this.setState({
        prevbirdFlyingHigh: birdFlyingHigh
      })

      //changing bottom - and fly. сдвиг птицы на высоту birdFlyingFinish))
      birdOnCanvas &&
        birdOnCanvas.setAttribute("style", `bottom: ${birdFlyingFinish}`);

      //текущая Y коорината центра птицы
      let currentYCoordinatOfBird = canvasHeight - (+birdFlyingFinish.slice(0, -2)) + birdHeigth / 2;

      //Обновляем значение высоты птицы в локальном стейте
      this.setYCoordinateToState(currentYCoordinatOfBird);

      //Создаем массив координат птицы в тукцщий момент
      this.createBirdCoordinatesArray(birdHeigth);

      // сдвигаем поле влево на 2 px и обновляем xCoordinates
      this.moveCanvasAndTextToLeft();
    }

    let flying = setInterval(loop, 1000 / playbackSpeed, birdFlyingFinish);
    this.setState({ flying: flying }); //передаем данные в глобальную переменную для сброса
  };


  // /////////////////////////////////////////////////////////////////////// сброс
  // птицы в начальное состояние
  stopBirdFlying() {
    const birdHeigth = this.state.birdRef?.clientHeight as number;
    this.state.birdRef?.setAttribute("style", `bottom: ${birdHeigth}px`);
    this.state.analyser?.disconnect();
    this.setState({ birdCoordinatesArray: [] });
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
    this.setState({
      canvasHeight: canvasHeight,
    });
    //уведичиваем счетчик для выхода из рекурсии в componentWillUpdate
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
    const canvasHeight = this.state.canvasHeight; //высота


    // получение контекста canvas
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.setState({ ctx: ctx });

    //рисование Создаем объект изображения финишной линии
    let finishLineImg = new Image();

    // Привязываем функцию к событию onload Рисуем финишную ленту, когда она
    // загружена с шириной 50 и высотой canvasHeight в координатах
    // finishXCoord, 0
    finishLineImg.onload = () => {
      const finishXCoord = this.props.finishLineXCoordinate
      ctx?.drawImage(finishLineImg, finishXCoord, 0, 50, canvasHeight);
    };
    // Загружаем файл изображения финишной ленты
    finishLineImg.src = this.props.srcTofinishLineImg;

    //задаем количесство вариантов значения высоты препятствия

    const heightValues = [
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
      let y1 = 0, y2 = 0; //переменные получения значения высоты

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
          // рисование кругов
          return this.paintCircle(ctx, item.x, y1, item.r);
        default:
          return null;
      }
    });

    //вызов функции дабавляющей в массив из препятствий пустые значения, 
    //чтобы в нем было значение для каждого X
    this.addZeroValuesInAllLinesCoordinatesArray();
  }

  // /////////////////////////////////////////////////////////////////// 
  // Создание массива координат из точек, которые составляют линию, формирующую
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
      if (this.state.allLinesCoordinatesArray.length === 0) {
        this.state.allLinesCoordinatesArray.push({ x: x, y: y })
      }
      else if (this.state.allLinesCoordinatesArray[this.state.allLinesCoordinatesArray.length - 1].x !== x) {
        this.state.allLinesCoordinatesArray.push({ x: x, y: y })
      }
    }
  }

  // /////////////////////////////////////////////////////////////////// 
  //Добаввление в массив координат из точек, которые составляют линию, формирующую
  // препятствие. пустых значений, чтобы номер элемента в массиве allLinesCoordinatesArray
  // соответствовал значению X.(для этого не должно быть препятствий одновременно сверху и снизу )
  // это кратно уменьшает загрузку процессора
  addZeroValuesInAllLinesCoordinatesArray() {
    for (let i = 0; i < this.props.currentSong.canvasWigth; i++) {
      let zeroElem = this.state.allLinesCoordinatesArray.find(currentcoordinata => {
        return i === currentcoordinata.x
      });
      if (!zeroElem) {
        this.state.allLinesCoordinatesArray.splice(i, 0, { x: i, y: -1 })
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
    let coord1 = { x: centerX, y: centerY },
      coord2 = { x: centerX - radius, y: centerY },
      coord3 = { x: centerX, y: centerY - radius },
      coord4 = { x: centerX + radius, y: centerY },
      coord5 = { x: centerX, y: centerY + radius };

    this.state.birdCoordinatesArray.push(coord1, coord2, coord3, coord4, coord5);

    // if you need more points
    // let prevX = 0;
    // let prevY = 0;
    // for (let degree = 0; degree < 360; degree += 45) {
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
  // сравнение перекрытия координат препятствий и любой из координат птицы (и четырех соседних точек по оси y)

  compareObstacleAndBirdCoordinates() {

    this.state.birdCoordinatesArray.forEach((currentBirdCoordinate) => {
      let i = currentBirdCoordinate.x
      if ((this.state.allLinesCoordinatesArray[i].x >= currentBirdCoordinate.x - 2 &&
        this.state.allLinesCoordinatesArray[i].x <= currentBirdCoordinate.x + 2
      ) &&
        (this.state.allLinesCoordinatesArray[i].y >= currentBirdCoordinate.y - 2 &&
          this.state.allLinesCoordinatesArray[i].y <= currentBirdCoordinate.y + 2)) {
        //СТОЛКНОВЕНИЕ
        // this.stopSigningAndMoving();
        // this.playSoundExploisionStart();
        //console.log('Столкновение')     
      }
    })
  }

  // /////////////////////////////////////////////////////////////////////
  // движение поля влево

  moveCanvasAndTextToLeft() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;
    const canvasWidth = canvas.clientWidth; // ширина


    //изменеие значения для сдвига текста и поля на каждом шаге на 2 px
    this.setState((state) => ({
      shiftTextToLeft: state.shiftTextToLeft - 2,
    }));


    //начинаем увеличивать Х координату птицы относительно начала canvas
    //с началом движения поля с шагом 2 px
    if (this.state.shiftTextToLeft <= 400) {
      // передаем X нового положения птицы в стейт
      this.setXCoordinateToState(this.state.xCoordOfBird + 2);
    }

    // //проверяем не столкнулась ли птица с препятствием
    this.compareObstacleAndBirdCoordinates();

    // Этосдвиг текста на каждом шаге
    if (canvasWidth && Math.abs(this.state.shiftTextToLeft) < canvasWidth) {
      textWrp.setAttribute(
        "style",
        `margin-left: ${this.state.shiftTextToLeft}px`
      );
      // Это сдвиг поля
      // на каждом шаге после того как текст поравняется с полем
      if (this.state.shiftTextToLeft <= 400) {
        canvas.setAttribute(
          "style",
          `left: ${this.state.shiftTextToLeft - 400}px`
        );
        //canvas.style.left = `${this.state.shiftTextToLeft - 400}px`;
      }
      // служебная функция  если надо проверить точность положения птицы с ее
      // координами в стейте
      // if (Math.abs(this.state.shiftTextToLeft) > 0) {
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
      Math.abs(this.state.xCoordOfBird) > this.props.finishLineXCoordinate
    ) {
      this.stopSigningAndMoving();
      this.playSoundOfFinish();
    }




  }

  //////////////////////////////////// сброс таймера settimeout-на движение поля
  clearTimer() {
    clearInterval(this.state.flying);
    clearTimeout(this.state.moovingStartTimer);
  }

  // ///////////////////////////////////////////////////////////////////////
  // УПРАВЛЕНИЕ ЗВУКОМ И ОТРИСОВКОЙ ОДНОВРЕМЕННО
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  stopSigningAndMoving() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;
    this.playSongStop();
    this.clearTimer();
    this.stopBirdFlying();
    canvas.setAttribute("style", "left: 20px"); //возврат поля в начало
    textWrp.setAttribute("style", `margin-left: 550px`); // возврат текста в исх позицию
    this.setState({
      shiftTextToLeft: 550,
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
  startSigningAndMoving() {
    // //Смена кнопки старт на стоп
    // this.props.stopBtnIsPushSet(false);
    //запуск проигрывания песни
    this.playSongStart();

    // запуск подъема птицы в зависимости от уровня голоса с микрофона
    // и запуск движенмя поля и текста
    this.mooveBirdByVoice();
  }


  setXCoordinateToState(xCoordOfBird: number) {
    this.setState({ xCoordOfBird: xCoordOfBird });
  }

  setYCoordinateToState(yCoordOfBird: number) {
    this.setState({ yCoordOfBird: yCoordOfBird });
  }

  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div>
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
  isCurrentSongPlaying: boolean;
  srcToSoundExploision: string;
  srcToSoundOfFinish: string;
  srcTofinishLineImg: string;
  finishLineXCoordinate: number;
  currentSongVolume: number;
  currentVoiceVolume: number;
  currentLanguage: "ru" | "en";
  languagesJSONData: any;
  sensibilityOfFly: number;

};

type MapDispatchToPropsType = {
  stopBtnIsPushSet: (isBtnPushed: boolean) => void;
  isCurrentSongPlayingSetter: (isCurrentSongPlaying: boolean) => void;
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
  isCurrentSongPlaying: getIsCurrentSongPlayingSetter(state),
  srcToSoundExploision: getSrcToSoundExploision(state),
  srcToSoundOfFinish: getSrcToSoundOfFinish(state),
  srcTofinishLineImg: getSrcTofinishLineImg(state),
  finishLineXCoordinate: getFinishLineXCoordinate(state),
  currentSongVolume: getCurrentSongVolume(state),
  currentVoiceVolume: getCurrentVoiceVolume(state),
  currentLanguage: getCurrentLanguage(state),
  languagesJSONData: getLanguagesJSONData(state),
  sensibilityOfFly: getSensibilityOfFly(state)
});

export default compose(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    stopBtnIsPushSet,
    isCurrentSongPlayingSetter,
    setNewVolumeOfSong,
    setNewVolumeOfVoice,
    currentLanguageToggle,
  })
)(SongPlayPageContainer);
