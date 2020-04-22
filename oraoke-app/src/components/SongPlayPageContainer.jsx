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
    this.window = window;
    this.canvasRef = null;
    this.canvasWrpRef = null;
    this.songMP3Ref = null;
    this.textWrpRef = null;
    this.birdRef = null;
    this.allLinesCoordinatesArray = [];//массив с координатами внешних границ всех препятствий
    this.birdCoordinatesArray = [];//массив координат прицы на данный момент
    this.voiceArray = []; //массив для хранеия данных с микрофона
    this.numOfItemsInVoiceArray = 32;//количество элементов в массиве в который будет записан звук с микрофона
    this.analyser=null;
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
    this.checkBirdFacedOnWall = this.checkBirdFacedOnWall.bind(this);
    this.mooveBirdByVoice = this.mooveBirdByVoice.bind(this);
    this.createBirdCoordinatesArray = this.createBirdCoordinatesArray.bind(this);
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
    
    this.timerId = 0; //таймер для движения поля
    this.moovingStartTimer = null;//SetTimeout задержки запуска движения относительно музыки
    this.shiftTextToLeft = 700; //начальная точка сдвига текста
    this.xCoordOfBird = 150; //начальное положение птицы по оси х
    this.yCoordOfBird = 50; //начальное положение птицы по оси y
  }
  
  
  //////////////////////////////////////////////////////////////////////////////////////
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Нажатие на кнопку СТОП - возврат к началу
    if (this.props.isStopBtnPushed && this.props.isStopBtnPushed!==prevProps.isStopBtnPushed) {this.playSongStop()}
  //нажатие на кнопку старт при перезапуске песни.
    if (!this.props.isStopBtnPushed && this.props.isStopBtnPushed!==prevProps.isStopBtnPushed) {this.checkBirdFacedOnWall();
      this.mooveBirdByVoice();}
  }
  
  
  /////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.saveDOMElementsToState(); //сохранение всех нужных DOM элементов в стейте
    this.setCanvasHeigth(); //изменение высоты canvas по родителю//ПРИ ПОВТОРНОМ ЗАХОДЕ НА СТРАНИЦУ НЕ УСТАНАВЛИВАЕТСЯ ВЫСОТА canvasWrp!!!!!!!

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
        4000,
        this.props.currentSong.startMovingDelay
      );
  
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
    const birdOnCanvas = this.getElementFromDOMorState(this.birdRef, "birdOnCanvas");
    this.props.saveDOMElementToState(canvas, "canvas");
    this.props.saveDOMElementToState(canvasWrp, "canvasWrp");
    this.props.saveDOMElementToState(songMP3, "songMP3");
    this.props.saveDOMElementToState(textWrp, "textWrp");
    this.props.saveDOMElementToState(birdOnCanvas, "birdOnCanvas");
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
  //////////////////////////////////////////////////////////////////////////////
  //движение птицы в зависимости от звука с микрофона
  mooveBirdByVoice() {
    const birdOnCanvas = this.getElementFromDOMorState(this.birdRef, "birdOnCanvas");
    const birdHeigth = birdOnCanvas.clientHeight;
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    let maxHeightForWile = this.props.isSetMaxUserVoiceLevel ? this.props.maxUserVoiceLevel : 255;
    let canvasHeight = canvas.clientHeight;
    this.voiceArray = new Uint8Array(this.numOfItemsInVoiceArray);
    // if (this.context) return;
    let context = new (window.AudioContext || window.webkitAudioContext)();//аудиоконтекст WEB AudioAPI
    let analyser = context.createAnalyser();
    this.analyser = analyser;//передаем данные в глобальную переменную для сброса
    //получаем поток с микрофона
    navigator
      .mediaDevices
      .getUserMedia({audio: true})
      .then(stream => {
      
        let srcOfVoice = context.createMediaStreamSource(stream);
        srcOfVoice.connect(analyser);//передача звука в аналайзер
        analyser.connect(context.destination); //вывод звука на колонки

        let loop = () => {
          let flying = window.requestAnimationFrame(loop);
          analyser.getByteFrequencyData(this.voiceArray); //получение данных частот
          this.flying = flying;//передаем данные в глобальную переменную для сброса
          
          // Получение усредненного значения звука по всем частотам
          let averageHeight = this.voiceArray.reduce((summ, current) => summ + current) / this.voiceArray.length;
  
          // Задание высоты подъема птицы от стреднего уровня сигнала в массиве

          let birdFlyingHidh = (canvasHeight*averageHeight/maxHeightForWile) < (canvasHeight) ? (birdHeigth+(canvasHeight*averageHeight/maxHeightForWile) + 'px') : (birdHeigth/2+(canvasHeight*averageHeight/maxHeightForWile) + 'px');
          birdOnCanvas.style.bottom = birdFlyingHidh; //changing bottom - and fly))

          //Создаем массив координат птицы в тукцщий момент
          this.createBirdCoordinatesArray(birdFlyingHidh, canvasHeight, birdHeigth);

          //Выход из рекурсии и возврат в начальное положение
          if (
            this.props.isStopBtnPushed || Math.abs(this.shiftTextToLeft) > canvas.offsetWidth
          ){
            this.stopBirdFlying();
          }
        
        }
        loop();

        
      })
      .catch(error => {
        alert(
          error + '\r\n\ Отклонено. Перезагрузите страницу!'
        );
      });
  }
  
  /////////////////////////////////////////////////////////////////////////
  //сброс птицы в начальное состояние
  stopBirdFlying(){
    cancelAnimationFrame(this.flying);
    this.props.birdOnCanvas.style.bottom = 70 + 'px';
    this.analyser && this.analyser.disconnect();
  }
  
  ////////////////////////////////////////////////////////////////////////////
  //Создание массива координат птицы на данный момемнт
  createBirdCoordinatesArray(birdFlyingHidh, canvasHeight, birdHeigth){
    let xCoordOfBird = this.props.xCoordOfBird ? this.props.xCoordOfBird : 150;//положение центра птицы по Х
    let yCoordOfBird = (this.props.canvas ? canvasHeight - (birdFlyingHidh.slice(0, -2)-birdHeigth) - birdHeigth/2 : canvasHeight- birdHeigth/2);//текущая Y коорината центра птицы
    this.saveBirdCoordinatesArray(xCoordOfBird, yCoordOfBird, birdHeigth/2);// функция передачи координат птицы и радиуса ее окружности
  }
 
  /////////////////////////////////////////////////////////////////////////////////
  //РАБОТА С ГРАФИКОЙ
  ///////////////////////////////////////////////////////////////////////////////////
  
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
    debugger
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
    this.saveLineCoordinates(x1, y1, x1, y2);//сохранить координаты линии в массив
    ctx.lineTo(x2, y2);
    this.saveLineCoordinates(x1, y2, x2, y2);//сохранить координаты линии в массив
    ctx.lineTo(x2, y1);
    this.saveLineCoordinates(x2, y2, x2, y1);//сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  
  // рисование треугольника
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
    strokeColor = "rgba(255, 29, 190, 0.8)"
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1+x2, y2);
    this.saveLineCoordinates(x1, y1, x1+x2, y2);//сохранить координаты линии в массив
    ctx.lineTo(x4-x3, y2);
    this.saveLineCoordinates(x1+x2, y2, x4-x3, y2);//сохранить координаты линии в массив
    ctx.lineTo(x4, y1);
    this.saveLineCoordinates(x4-x3, y2, x4, y1);//сохранить координаты линии в массив
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //отрисовка всего canvas
  paintingCanvasField() {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    let canvasWidth = canvas.width; //ширина
    let canvasHeigth = canvas.offsetHeight; //высота
    canvas.height = canvas.offsetHeight; //Чтобы изображение не растягивалось
    const ctx = canvas.getContext("2d");
    let h0 = canvasHeigth + 9,
        h1 = canvasHeigth - canvasHeigth * 0.1,
        h2 = canvasHeigth - canvasHeigth * 0.3,
        h3 = canvasHeigth - canvasHeigth * 0.5,
        h4 = canvasHeigth - canvasHeigth * 0.7,
        h5 = canvasHeigth - canvasHeigth * 0.9,
        h6 = 0;
    
    //рисование
    
    this.paintTrapeze(ctx, 400, h0, 100, 0,1000, h1);//Ночь по улицам пошла
  
    this.paintTrapeze(ctx, 1250, h6, 100, 100,1500, h3);
    
    this.paintTrapeze(ctx, 1680, h0, 100, 100,2000, h2);//Звездной постутью
    this.paintTriangle(ctx, 2150, h0, 2225, h3, 2300);// цариц
  
    this.paintTrapeze(ctx, 2550, h6, 100, 100,3000, h4);
    
    this.paintTrapeze(ctx, 3100, h0  , 100, 100,3670, h2);//Слов и чисел простота
    this.paintTrapeze(ctx, 3830, h0  , 100, 100,4300, h2);//у небесного моста
  
    this.paintTrapeze(ctx, 3830, h6  , 100, 100,4300, h5);
    
    this.paintTrapeze(ctx, 4570, h0  , 50, 50,4980, h2);//раскидала перья
    this.paintTriangle(ctx, 5000, h0, 5175, h4, 5350);//пти и и и и и ц
  
    this.paintTrapeze(ctx, 5500, h6  , 100, 100,6360, h5);
    
    this.paintTrapeze(ctx, 5870, h0  , 100, 100,6360, h1);//Не забудутся никем
  
    this.paintTrapeze(ctx, 6560, h6  , 100, 100,6800, h3);
    
    this.paintTrapeze(ctx, 7150, h0  , 100, 100,7800, h2);//праздник губ обид и глаз
  
    this.paintTrapeze(ctx, 7950, h6  , 100, 100,8200, h4);
    
    this.paintTrapeze(ctx, 8580, h0  , 100, 100,9200, h4);//Забери меня в свой плен
    this.paintTrapeze(ctx, 9400, h0  , 100, 100,9800, h2);//эту линию колен
    this.paintTrapeze(ctx, 10050, h0  , 50, 50,10550, h3);//целовать в последний
    this.paintTriangle(ctx, 10650, h0, 10775, h4, 10900);//раааааааз
    this.paintTrapeze(ctx, 11200, h0  , 100, 100,11670, h4);//Тоооолькооооооо
    this.paintTrapeze(ctx, 11930, h0  , 100, 100,12566, h4);//рюмка водкииии на столе
    this.paintTrapeze(ctx, 12770, h0  , 100, 100,13390, h3);//Ветер плачет за окнооом
    this.paintTrapeze(ctx, 13550, h0  , 100, 100,13780, h4);//тиииииихооо
    this.paintTrapeze(ctx, 13900, h0  , 100, 100,14200, h3);//больююююю
  
    this.paintTrapeze(ctx, 14400, h6  , 100, 100,14700, h4);
    
    this.paintTrapeze(ctx, 14736, h0  , 100, 100,15400, h2);//о т з ы в а ю т с я в о м н е
    this.paintTrapeze(ctx, 15550, h0  , 100, 100,16050, h2);// т о й молодой   л у н ы
  
    this.paintTrapeze(ctx, 15700, h6  , 100, 100,15900, h5);
    
    this.paintTrapeze(ctx, 16280, h0  , 100, 100,16490, h4);//к р и к и

  }
  
  /////////////////////////////////////////////////////////////////////
  //Создание массива координат из точек, которые составляют линию, формирующую препятствие.
  saveLineCoordinates (x1, y1, x2, y2) {
    let A = [x1, y1];
    let B = [x2, y2];
  
    function slope(a, b) {
      if (a[0] == b[0]) {
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
      this.allLinesCoordinatesArray.push({x:x, y:y});
    }

  }
  
  ///////////////////////////////////////////////////////////////////
  // создание массива координат круга, который занимает птица в данный момент
  saveBirdCoordinatesArray (newx, newy, radius) {
    this.birdCoordinatesArray = [];//обнулить массив
    let centerX=newx;
    let centerY=newy;

// an array to save your points
    let prevX = 0;
    let prevY = 0;
    for(let degree=0;degree<360;degree++){
      let radians = degree * Math.PI/180;
      let x = +(centerX + radius * Math.cos(radians)).toFixed(0);
      let y = +(centerY + radius * Math.sin(radians)).toFixed(0);
      if (x!== prevX && y !==prevY ) {
        this.birdCoordinatesArray.push({x:x,y:y});
        prevX = x;
        prevY = y;
      }
    }
  }
  
  
  //////////////////////////////////////////////////////////////////////////////
  //сравнение перекрытия координат препятствий и координат птицы
  compareObstacleAndBirdCoordinates(birdCoordinatesArray, allLinesCoordinatesArray) {
    let xObstacleMin = allLinesCoordinatesArray[0].x;
    let xObstacleMax = allLinesCoordinatesArray[allLinesCoordinatesArray.length-1].x;
    let xBirdMin = birdCoordinatesArray[0] ? birdCoordinatesArray[((birdCoordinatesArray.length-1)/2).toFixed(0)].x : 75;
    let xBirdMax = birdCoordinatesArray[0] ? birdCoordinatesArray[0].x : 225;
    
    if (xBirdMax > xObstacleMin && xBirdMin < xObstacleMax) {
      let acrossingCoordinatesArray = [];
      allLinesCoordinatesArray.forEach((currentCoordinate, index) => {
        if (currentCoordinate.x > xBirdMin &&  currentCoordinate.x < xBirdMax)
        {
          //X двух массивов пересекаются
          acrossingCoordinatesArray.push(currentCoordinate);
        }
      });
      // console.log(acrossingCoordinatesArray);
      birdCoordinatesArray.forEach((currentCoordinate) => {
        for (let i = 0; i<acrossingCoordinatesArray.length-1; i++ )
        {
          if (currentCoordinate.y == acrossingCoordinatesArray[i].y) {
            //событие столкновения птицы и препятствия
            console.log('СТОЛКНОВЕНИЕ');
            this.stopSigningAndMoving();
            console.log(`координата х птицы ${currentCoordinate.x}. Координата х препятствия ${acrossingCoordinatesArray[i].x}`)
            console.log(`координата y птицы ${currentCoordinate.y}. Координата y препятствия ${acrossingCoordinatesArray[i].y}`)
          }
        }
      })
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////
  //проверка факта столкновения птицы с препятствием
  checkBirdFacedOnWall(){
    this.props.birdOnCanvas && this.compareObstacleAndBirdCoordinates(this.birdCoordinatesArray, this.allLinesCoordinatesArray);// сравнивает координаты птицы и препятствий и выдает сообщение о столкновении
  }
  
  // ///////////////////////////////////////////////////////////////////////
  // движение поля влево
  
  moveCanvasAndTextToLeft() {
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const textWrp = this.getElementFromDOMorState(this.textWrpRef, "textWrp");
    let canvasWidth = canvas.width; //          ширина
    this.shiftTextToLeft -= 1;
    this.shiftTextToLeft <= 400 ? this.xCoordOfBird += 1 : this.xCoordOfBird += 0;//начинаем увеличивать Х координату птицы с началом движения поля
    if ( Math.abs(this.shiftTextToLeft) < canvasWidth) {
      textWrp.style.marginLeft = `${this.shiftTextToLeft}px`; // Этосдвиг текста
      if (this.shiftTextToLeft <= 400) {
        canvas.style.left = `${this.shiftTextToLeft-400}px`; // Это сдвиг поля
      }
    }
    if (
      this.props.isStopBtnPushed || Math.abs(this.shiftTextToLeft) > canvasWidth
    ) {this.stopSigningAndMoving(); //остановка по нажатии СТОП или конце поля.
      }
    this.sendChangingDataToState(this.xCoordOfBird); // передаем X и Y положения птицы в стейт (пока только Х)
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
    const canvas = this.getElementFromDOMorState(this.canvasRef, "canvas");
    const textWrp = this.getElementFromDOMorState(this.textWrpRef, "textWrp");
    let speed = this.props.currentSong.playbackSpeed;
    this.playSongStop();
    this.clearTimer();
    canvas.style.left = `20px`; //возврат поля в начало
    textWrp.style.marginLeft = `${speed * 3}px`; // возврат текста в исх позицию
    this.shiftTextToLeft = speed * 3.5; //сброс счетчика сдвига текстового поля
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
    this.moovingStartTimer =  setTimeout(this.runMoving, delayMs, playbackSpeed);
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
          birdRefGetter = {this.birdRefGetter}
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
  birdOnCanvas: getBirdOnCanvas(state),
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
