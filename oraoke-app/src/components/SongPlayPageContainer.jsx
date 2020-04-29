import React from "react";
import SongPlayPage from "./SongPlayPage";
import {compose} from "redux";
import {connect} from "react-redux";
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
  getTimerSongPlaying,
  getXCoordOfBird,
  getYCoordOfBird,
  getSoundExploision,
  getSoundOfFinish,
  getSrcToSoundExploision,
  getSrcToSoundOfFinish,
  getSrcTofinishLineImg,
  getFinishLineXCoordinate, getCurrentSongVolume, getCurrentVoiceVolume
} from "../redux/startPageSelectors";
import {
  isPlayingSet,
  stopBtnIsPushSet,
  saveDOMElementToState,
  isCurrentSongPlayingSetter,
  sendChangingMoveDataToState,
  setNewVolumeOfSong,
  setNewVolumeOfVoice,
} from "./../redux/startPageReduser";


class SongPlayPageContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.window = window;
    this.canvasRef = null;
    this.canvasWrpRef = null;
    this.songMP3Ref = null;
    this.textWrpRef = null;
    this.birdRef = null;
    this.soundExploisionRef = null;
    this.soundOfFinishRef = null;
    this.allLinesCoordinatesArray = [];//массив с координатами внешних границ всех препятствий
    this.birdCoordinatesArray = [];//массив координат прицы на данный момент
    this.voiceArray = []; //массив для хранеия данных с микрофона
    this.numOfItemsInVoiceArray = 32; //количество элементов в массиве
    // в который будет записан звук с микрофона
    this.analyser = null;
    this.flying = null;
    
    //////////////////////////
    //Забиндить this для всех методов где это надо
    this.getElementFromDOMorState = this.getElementFromDOMorState.bind(this);
    this.isCurrentSongPlayingSet = this.isCurrentSongPlayingSet.bind(this);
    this.setCanvasHeigth = this.setCanvasHeigth.bind(this);
    this.playSongStart = this.playSongStart.bind(this);
    this.playSongStop = this.playSongStop.bind(this);
    this.playSongPause = this.playSongPause.bind(this);
    this.playPauseOnSpaseBtn = this.playPauseOnSpaseBtn.bind(this);
    this.paintTriangle = this.paintTriangle.bind(this);
    this.paintingCanvasField = this.paintingCanvasField.bind(this);
    this.moveCanvasAndTextToLeft = this.moveCanvasAndTextToLeft.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.compareObstacleAndBirdCoordinates = this.compareObstacleAndBirdCoordinates.bind(this);
    this.stopSigningAndMoving = this.stopSigningAndMoving.bind(this);
    this.pauseSigningAndMoving = this.pauseSigningAndMoving.bind(this);
    this.startSigningAndMoving = this.startSigningAndMoving.bind(this);
    this.runMoving = this.runMoving.bind(this);
    this.sendChangingDataToState = this.sendChangingDataToState.bind(this);
    this.checkBirdFacedOnWall = this.checkBirdFacedOnWall.bind(this);
    this.mooveBirdByVoice = this.mooveBirdByVoice.bind(this);
    this.createBirdCoordinatesArray = this.createBirdCoordinatesArray.bind(this);
    this.playSoundExploisionStart = this.playSoundExploisionStart.bind(this);
    this.changeVolumeOfSong = this.changeVolumeOfSong.bind(this);
    this.changeVolumeOfVoice = this.changeVolumeOfVoice.bind(this);
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
    this.birdRefGetter = (el) => {
      this.birdRef = el;
    };
    this.soundExploisionRefGetter = (el) => {
      this.soundExploisionRef = el;
    };
    this.soundOfFinishRefGetter = (el) => {
      this.soundOfFinishRef = el;
    };
    this.songVolumeInputRefGetter = (el) => {
      this.songVolumeInputRef = el;
    };
    this.voiceVolumeInputRefGetter = (el) => {
      this.voiceVolumeInputRef = el;
    };
    
    this.timerId = 0; //таймер для движения поля
    this.moovingStartTimer = null;//SetTimeout задержки запуска движения относительно музыки
    this.shiftTextToLeft = 700; //начальная точка сдвига текста
    this.xCoordOfBird = 150; //начальное положение птицы по оси х
    this.yCoordOfBird = 50; //начальное положение птицы по оси y
  }
  
  
  //////////////////////////////////////////////////////////////////////////////////////
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Нажатие на кнопку СТОП - возврат к началу
    if (this.props.isStopBtnPushed && this.props.isStopBtnPushed !== prevProps.isStopBtnPushed) {
      this.playSongStop();
      this.checkBirdFacedOnWall();
      this.sendChangingDataToState(150, 0);//сброс массива координат прицы в пропсах
    }
    //нажатие на кнопку старт при перезапуске песни.
    if (!this.props.isStopBtnPushed && this.props.isStopBtnPushed !== prevProps.isStopBtnPushed) {
      this.checkBirdFacedOnWall();
      this.mooveBirdByVoice();
      this.sendChangingDataToState(150, 0);//сброс массива координат прицы в пропсах
    }
  }
  
  
  /////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.saveDOMElementsToState(); //сохранение всех нужных DOM элементов в стейте
    this.setCanvasHeigth(); //изменение высоты canvas по родителю
    
    //пересчет размеров поля canvas при изменении размеров окна браузера
    window.addEventListener("resize", this.setCanvasHeigth);
    
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
    
    // songVolumeInput.addEventListener('change', (value) => {
    //   this.changeVolumeOfSong(value);
    // }, false)
    document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }
  
  //////////////////////////////////////////////////////////////////////////////////////
  componentWillUnmount() {
    window.removeEventListener("resize", this.setCanvasHeigth);
    document.removeEventListener("keyup", this.playPauseOnSpaseBtn);
    clearTimeout(this.autoPlaySong);
    this.stopBirdFlying();
  }
  
  // ///////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // получение элемента из стейта, а если его там нет, то из DOM (при прокиданном
  // коллбеке ...RefGetter)
  getElementFromDOMorState(elementRef, elementName) {
    if (elementRef && !this.props[elementName] || elementRef && elementRef.clientHeight === 0) {
      return elementRef;
    } else {
      return this.props[elementName];
    }
  }
  
  //сохранение всех нужных DOM элементов в сторе
  saveDOMElementsToState() {
    const canvasWrp = this.getElementFromDOMorState(this.canvasWrpRef, "canvasWrp");
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const songMP3 = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    const textWrp = this.getElementFromDOMorState(this.textWrpRef, "textWrp");
    const birdOnCanvas = this.getElementFromDOMorState(this.birdRef, "birdOnCanvas");
    const soundExploision = this.getElementFromDOMorState(this.soundExploisionRef,
                                                    "soundExploision");
    const soundOfFinish = this.getElementFromDOMorState(this.soundOfFinishRef, "soundOfFinish");
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
  isCurrentSongPlayingSet(isCurrentSongPlaying) {
    this.props.isCurrentSongPlayingSetter(isCurrentSongPlaying);
  }
  
  // ////////////////////////////////////////////////////////////////////////
  // Запуск фоновой песни
  playSongStart() {
    const audio = this.getElementFromDOMorState(this.songMP3Ref, "songMP3");
    audio.volume = this.props.currentSongVolume;// получение громкости из props
    // в зависимости от инпута
    audio.play();
    this.isCurrentSongPlayingSet(true);
  }
  
  /////////////////////////////////////////////////////////////////////////
  //Запуск звука взрыва при столкновении
  playSoundExploisionStart() {
    const soundExploision = this.getElementFromDOMorState(this.soundExploisionRef,
      "soundExploision");
    soundExploision.play();
  }
  
  ////////////////////////////////////////////////////////////////////////
  //запуск зпобедных фанфар при прохождении до конца
  playSoundOfFinish() {
    const soundOfFinish = this.soundOfFinishRef;
    soundOfFinish.play();
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
  
  //////////////////////////////////////////////////////////////////////////////
  //изменение громкости музыки
  changeVolumeOfSong(value) {
    this.props.setNewVolumeOfSong(value.target.value);
  }
  
  //////////////////////////////////////////////////////////////////////////
  //изменение громкости голоса
  changeVolumeOfVoice(value) {
    this.props.setNewVolumeOfVoice(value.target.value);
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //движение птицы в зависимости от звука с микрофона
  mooveBirdByVoice() {
    const birdOnCanvas = (this.props.birdOnCanvas && this.props.birdOnCanvas.clientHeight !== 0) ?
                          this.props.birdOnCanvas
                          :
                          this.birdRef;
    
    const canvas = (this.props.canvas && this.props.canvas.clientHeight !== 0) ?
                    this.props.canvas
                    :
                    this.canvasRef;
    const birdHeigth = birdOnCanvas.clientHeight;
    let maxHeightForWile = this.props.isSetMaxUserVoiceLevel ?
                            this.props.maxUserVoiceLevel
                          : 255;
    let canvasHeight = canvas.clientHeight;
    this.voiceArray = new Uint8Array(this.numOfItemsInVoiceArray);
    // if (this.context) return;
    let context = new (window.AudioContext ||
                  window.webkitAudioContext)();//аудиоконтекст WEB AudioAPI
    let analyser = context.createAnalyser();
    let gainNode = context.createGain(); //создание усилительного узла
    this.analyser = analyser;//передаем данные в глобальную переменную для сброса
    //получаем поток с микрофона и работаем с ним
    navigator
      .mediaDevices
      .getUserMedia({audio: true})
      .then(stream => {
        let srcOfVoice = context.createMediaStreamSource(stream);
        srcOfVoice.connect(analyser);//передача звука в аналайзер
        analyser.connect(gainNode);//включение усилителя перед колонками
        gainNode.connect(context.destination); //вывод звука c усилителя на колонки
        gainNode.gain.setValueAtTime(+this.props.currentVoiceVolume,
                                    context.currentTime); //усиление/ослабление исходного звука
        // в зависимости от инпута через стейт звука
        let prevbirdFlyingHigh;
        let birdFlyingFinish;
        //рекурсивная функция обработки принятого звука с частотой примерно 60 раз в секугду
        let loop = () => {
          let flying = window.requestAnimationFrame(loop);
          analyser.getByteFrequencyData(this.voiceArray); //получение данных частот
          this.flying = flying;//передаем данные в глобальную переменную для сброса
          
          // Получение усредненного значения звука по всем частотам - это и будет текущее
          // значение уровня звука
          let averageHeight = this.voiceArray.reduce((summ, current) =>
            summ + current) / this.voiceArray.length;
          
          // Задание высоты подъема птицы от стреднего уровня сигнала в массиве
          let birdFlyingHigh =
            (canvasHeight * averageHeight / maxHeightForWile) < (canvasHeight - birdHeigth) ?
            canvasHeight * averageHeight / maxHeightForWile
            : (canvasHeight - birdHeigth);
          // console.log(`текущее: ${averageHeight} максимальное:
          // ${maxHeightForWile} Итоговое: ${birdFlyingHigh}. Общая высота ${canvasHeight} `);
          
          //если очередное значение отличается от предыдущего больше чем на 2 то уменьшаем разницу
          // до 1. Чтобы убрать резкие скачки.
          if (birdFlyingHigh - prevbirdFlyingHigh > 2 && birdFlyingHigh - prevbirdFlyingHigh > 0)
          {
            birdFlyingFinish = (prevbirdFlyingHigh + 1 + 70 + 'px');
          }
          else if ((Math.abs(birdFlyingHigh - prevbirdFlyingHigh) > 2 &&
                   (birdFlyingHigh - prevbirdFlyingHigh) < 0))
          {
            birdFlyingFinish = (prevbirdFlyingHigh - 1 + 70 + 'px');
          } else {
            birdFlyingFinish = birdFlyingHigh + 70 + 'px';
          }
  
          //записать текущее значение в предыдущее
          // для сравнения на следующем шаге
         prevbirdFlyingHigh = birdFlyingHigh;
  
          //changing bottom - and fly. сдвиг птицы на высоту birdFlyingFinish))
          birdOnCanvas.style.bottom = birdFlyingFinish;
          
          // Обновляем значение высоты подъема птицы в глобальной переменной
          this.yCoordOfBird = this.props.canvas ?
            canvasHeight - (birdFlyingHigh - birdHeigth) - birdHeigth / 2
            :
            canvasHeight - birdHeigth / 2;//текущая Y коорината центра птицы
          
          //Создаем массив координат птицы в тукцщий момент
          this.createBirdCoordinatesArray(birdHeigth);
          
          //Выход из рекурсии и возврат в начальное положение
          if (
            this.props.isStopBtnPushed || Math.abs(this.shiftTextToLeft) > canvas.offsetWidth
          ) {
            this.stopBirdFlying();
          }
        };
        loop();
      })
      .catch(error => {
        alert(
          // eslint-disable-next-line no-useless-escape
          error + '\r\n\ Отклонено. Перезагрузите страницу!'
        );
      });
  }
  
  /////////////////////////////////////////////////////////////////////////
  //сброс птицы в начальное состояние
  stopBirdFlying() {
    cancelAnimationFrame(this.flying);
    this.props.birdOnCanvas.style.bottom = 70 + 'px';
    this.analyser && this.analyser.disconnect();
  }
  
  ////////////////////////////////////////////////////////////////////////////
  //Создание массива координат птицы на данный момемнт
  createBirdCoordinatesArray(birdHeigth) {
    let xCoordOfBird = this.xCoordOfBird;//положение центра птицы по Х
    let yCoordOfBird = this.yCoordOfBird;//положение центра птицы по Y
  
    // функция передачи координат птицы и радиуса ее окружности
    this.saveBirdCoordinatesArray(xCoordOfBird, yCoordOfBird, birdHeigth / 2);
  }
  
  /////////////////////////////////////////////////////////////////////////////////
  //РАБОТА С ГРАФИКОЙ
  ///////////////////////////////////////////////////////////////////////////////////
  
  // изменение высоты canvas
  setCanvasHeigth() {
    const canvas = (this.props.canvas && this.props.canvas.clientHeight !== 0) ?
                  this.props.canvas
                  : this.canvasRef;
    const canvasWrp = (this.props.canvasWrp && this.props.canvasWrp.clientHeight !== 0) ?
                    this.props.canvasWrp
                  : this.canvasWrpRef;
    
    //устанавливаем высоту планшета на 80 px меньше родителя (80 для текста)
    let canvasHeigth = canvasWrp.clientHeight - 80;
    canvas.style.height = `${canvasHeigth}px`;
  }
  
  // ///////////////////////////////////////////////////////////////////////////
  
  // рисование треугольника
  paintTriangle(
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (вверху)
    x2, //x вершины
    y2, //y  вершины
    x3, //конечная x (справа)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)"//цвет контура
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    this.saveLineCoordinates(x1, y1, x2, y2);//сохранить координаты линии в массив
    ctx.lineTo(x3, y1);
    this.saveLineCoordinates(x2, y2, x3, y1);//сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  //рисование трапеции
  paintTrapeze(
    ctx, //контекст
    x1, //начальная x (слева)
    y1, //начальная y (внизу)
    x2, // сдвиг от начала до первой верхней грани по X
    x3, // сдвиг от конца до второй верхней грани по X
    x4, //конечная x (справа)
    y2, //конечная y (вверху)
    fillColor = "rgba(135, 0, 250, 0.8)", //заливка фигуры
    strokeColor = "rgba(255, 29, 190, 0.8)"//цвет контура
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + x2, y2);
    this.saveLineCoordinates(x1, y1, x1 + x2, y2);//сохранить координаты линии в массив
    ctx.lineTo(x4 - x3, y2);
    this.saveLineCoordinates(x1 + x2, y2, x4 - x3, y2);//сохранить координаты линии в массив
    ctx.lineTo(x4, y1);
    this.saveLineCoordinates(x4 - x3, y2, x4, y1);//сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //отрисовка всего canvas
  paintingCanvasField() {
    const canvas = (this.props.canvas && this.props.canvas.clientHeight !== 0) ?
                    this.props.canvas
                    : this.canvasRef;
    let canvasHeigth = canvas.offsetHeight; //высота
    
    canvas.height = canvas.offsetHeight; //Чтобы изображение не растягивалось
    
    //получение контекста canvas
    const ctx = canvas.getContext("2d");
    
    //рисование
    
    // Создаем объект изображения финишной линии
    let finishLineImg = new Image();
    
    // Привязываем функцию к событию onload
    // Рисуем финишную ленту, когда она загружена с шириной 50 и высотой canvasHeigth
    // в координатах finishLineXCoordinate, 0
    finishLineImg.onload = () => {
      ctx.drawImage(finishLineImg, this.props.finishLineXCoordinate, 0, 50, canvasHeigth);//
    };
    // Загружаем файл изображения финишной ленты
    finishLineImg.src = this.props.srcTofinishLineImg;
    
    //задаем количесство вариантов значения высоты препятствия
    let heightValues = [
      {h0: canvasHeigth + 9},
      {h1: canvasHeigth - canvasHeigth * 0.1},
      {h2: canvasHeigth - canvasHeigth * 0.3},
      {h3: canvasHeigth - canvasHeigth * 0.5},
      {h4: canvasHeigth - canvasHeigth * 0.7},
      {h5: canvasHeigth - canvasHeigth * 0.9},
      {h6: 0}
    ];
    let keys = [];
    let heightData = [];
    
    //разбиваем heightValues на массив ключей и массив значений
    heightValues.forEach((item, i) => {
      let key = Object.keys(item);
      keys.push(key[0]);//названия значений высот для сравнения со значением в стейте
      heightData.push(item[key[0]]);//значение высот в пикселях
    });
    
    
    //////////////////////////////////////////////////////////////////////
    //Автоматическое рисование фигур на основе данных из стейта
    this.props.currentSong.itemsOnCanvasCoordinates.map(item => {
      
      let y1, y2;//переменные получения значения высоты
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
          return this.paintTrapeze(ctx, item.x1, y1, item.x2, item.x3, item.x4, y2);
        case "triangle":
          // рисование треугольников
          return this.paintTriangle(ctx, item.x1, y1, item.x2, y2, item.x3);
        default:
          return null;
      }
    });
  }
  
  /////////////////////////////////////////////////////////////////////
  //Создание массива координат из точек, которые составляют линию, формирующую препятствие.
  saveLineCoordinates(x1, y1, x2, y2) {
    let A = [x1, y1];
    let B = [x2, y2];
    
    function slope(a, b) {
      if (a[0] === b[0]) {
        return null;
      }
      return (b[1] - a[1]) / (b[0] - a[0]);
    }
    
    function intercept(point, slope) {
      if (slope === null) {
        // vertical line
        return point[0];
      }
      
      return point[1] - slope * point[0];
    }
    
    var m = slope(A, B);
    var b = intercept(A, m);
    
    for (let x = A[0]; x <= B[0]; x++) {
      let y = +(m * x + b).toFixed(0);
      this.allLinesCoordinatesArray.push({x: x, y: y});
    }
    
  }
  
  ///////////////////////////////////////////////////////////////////
  // создание массива координат круга, который занимает птица в данный момент
  // (достаточно 8 точек по кругу)
  saveBirdCoordinatesArray(newx, newy, radius) {
    this.birdCoordinatesArray = [];//обнулить массив
    let centerX = newx;
    let centerY = newy;

// an array to save your points
    let prevX = 0;
    let prevY = 0;
    for (let degree = 0; degree < 360; degree += 45) {
      let radians = degree * Math.PI / 180;
      let x = +(centerX + radius * Math.cos(radians)).toFixed(0);
      let y = +(centerY + radius * Math.sin(radians)).toFixed(0);
      if (x !== prevX && y !== prevY) {
        this.birdCoordinatesArray.push({x: x, y: y});
        prevX = x;
        prevY = y;
      }
    }
  }
  
  
  //////////////////////////////////////////////////////////////////////////////
  //сравнение перекрытия координат препятствий и координат птицы
  compareObstacleAndBirdCoordinates(allLinesCoordinatesArray) {
    //координата в середине массива всегда минимальная
    let xBirdMin = this.birdCoordinatesArray[0] ?
      this.birdCoordinatesArray[((this.birdCoordinatesArray.length - 1) / 2).toFixed(0)].x
      : 75;
    
    //первая координата всегда максимальная
    let xBirdMax = this.birdCoordinatesArray[0] ?
      this.birdCoordinatesArray[0].x
      : 185;
    
    let acrossingCoordinatesArray = [];
    
    // это цикл который считает только каждую третью координату препятствия
    // (для меньшей загрузки процессора)
    for (let i = 0; i < allLinesCoordinatesArray.length - 1; i += 1) {
      if ((allLinesCoordinatesArray[i].x > xBirdMin) && (allLinesCoordinatesArray[i].x < xBirdMax))
      {
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
    this.birdCoordinatesArray.forEach((currentCoordinate) => {
      for (let i = 0; i < acrossingCoordinatesArray.length - 1; i++) {
        if (currentCoordinate.y === acrossingCoordinatesArray[i].y) {
          //событие столкновения птицы и препятствия
          console.log('СТОЛКНОВЕНИЕ');
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
    this.props.birdOnCanvas && this.compareObstacleAndBirdCoordinates(this.allLinesCoordinatesArray);
  }
  
  // ///////////////////////////////////////////////////////////////////////
  // движение поля влево
  
  moveCanvasAndTextToLeft() {
    const canvas = (this.props.canvas && this.props.canvas.clientHeight !== 0) ?
                    this.props.canvas
                    : this.canvasRef;
    const textWrp = (this.props.textWrp && this.props.textWrp.clientHeight !== 0) ?
                    this.props.textWrp
                    : this.textWrpRef;
    let canvasWidth = canvas.clientWidth; // ширина
    
    this.shiftTextToLeft -= 1; //значение для сдвига текста на каждом шаге
  
    //начинаем увеличивать Х координату птицы относительно начала canvas с началом движения поля
    if (this.shiftTextToLeft <= 400) {this.xCoordOfBird += 1;}
    
    
    if (Math.abs(this.shiftTextToLeft) < canvasWidth) {
      // Этосдвиг текста на каждом шаге
      textWrp.style.marginLeft = `${this.shiftTextToLeft}px`;
      
      // Это сдвиг поля на каждом шаге после того как текст поравняется с полем
      if (this.shiftTextToLeft <= 400) {
        canvas.style.left = `${this.shiftTextToLeft - 400}px`;
      }
    }
  
    //остановка по нажатии СТОП.
    if (this.props.isStopBtnPushed)
    {
      this.stopSigningAndMoving();
    }
    //остановка в конце поля при пересечении линии финиш.
    else if (Math.abs(this.props.xCoordOfBird) > this.props.finishLineXCoordinate - 350)
    {
      this.stopSigningAndMoving();
      this.playSoundOfFinish();
    }
    
    // передаем X положения птицы в стейт
    this.sendChangingDataToState(this.xCoordOfBird);
  
    //проверяем не столкнулась ли птица с препятствием
    this.checkBirdFacedOnWall();
  }
  
  ////////////////////////////////////
  //сброс таймера settimeout-на движение поля
  clearTimer() {
    clearInterval(this.timerId);
    clearTimeout(this.moovingStartTimer);
    console.log("Таймер остановлен");
  }
  
  /////////////////////////////////////////////////////////////////////////
  //УПРАВЛЕНИЕ ЗВУКОМ И ОТРИСОВКОЙ ОДНОВРЕМЕННО
  ////////////////////////////////////////////////////////////////////////
  
  // ////////////////////////////////////////////////////////////////////////
  // Остановка проигрывания и движения, возврат в исходное состояние
  stopSigningAndMoving() {
    
    const canvas = (this.props.canvas && this.props.canvas.clientHeight !== 0) ?
      this.props.canvas
      : this.canvasRef;
    const textWrp = (this.props.textWrp && this.props.textWrp.clientHeight !== 0) ?
      this.props.textWrp
      : this.textWrpRef;
    let speed = this.props.currentSong.playbackSpeed;
    this.playSongStop();
    this.clearTimer();
    canvas.style.left = `20px`; //возврат поля в начало
    textWrp.style.marginLeft = `${speed * 3}px`; // возврат текста в исх позицию
    this.shiftTextToLeft = speed * 3.5; //сброс счетчика сдвига текстового поля
    this.sendChangingDataToState(150, 0);//сброс массива координат прицы
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
    const playbackSpeed = this.props.currentSong.playbackSpeed;
    this.props.stopBtnIsPushSet(false);
    this.playSongStart();
    //если с начала, то текст с задержкой запускается
    this.moovingStartTimer = setTimeout(this.runMoving, delayMs, playbackSpeed);
  }
  
  ////////////////////////////////////////////////////
  //запуск движения поля и текста со скростью speed px/с
  runMoving(speed) {
    this.timerId = setInterval(
      this.moveCanvasAndTextToLeft,
      1000 / speed
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
          birdRefGetter={this.birdRefGetter}
          songVolumeInputRefGetter={this.songVolumeInputRefGetter}
          voiceVolumeInputRefGetter={this.voiceVolumeInputRefGetter}
          soundExploisionRefGetter={this.soundExploisionRefGetter}
          soundOfFinishRefGetter={this.soundOfFinishRefGetter}
          stopSigningAndMoving={this.stopSigningAndMoving}
          startSigningAndMoving={this.startSigningAndMoving}
          isCurrentSongPlaying={this.props.isCurrentSongPlaying}
          xCoordOfBird={this.xCoordOfBird}
          changeVolumeOfSong={this.changeVolumeOfSong}
          changeVolumeOfVoice={this.changeVolumeOfVoice}
          {...this.props}/>
      </div>);
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
  birdOnCanvas: getBirdOnCanvas(state),
  isCurrentSongPlaying: getIsCurrentSongPlayingSetter(state),
  timerSongPlaying: getTimerSongPlaying(state),
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
});

export default compose(
  connect(mapStateToProps, {
    saveDOMElementToState,
    stopBtnIsPushSet,
    isPlayingSet,
    isCurrentSongPlayingSetter,
    sendChangingMoveDataToState,
    setNewVolumeOfSong,
    setNewVolumeOfVoice,
  })
)(SongPlayPageContainer);
