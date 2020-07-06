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
  isThisFirstTimePlaying: boolean;
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
      allLinesCoordinatesArray: [], //array with coordinates of the outer borders of all obstacles
      birdCoordinatesArray: [], //array of the bird coordinates at the moment
      voiceArray: null, //array for storing data from the microphone
      numOfItemsInVoiceArray: 32, //number of elements in the array
      // which the microphone audio will be recorded
      analyser: null,
      flying: 0,
      ctx: undefined, //contex for painting in canvas
      canvasHeight: 0,
      moovingStartTimer: 0, //SetTimeout-delaying the start of movement relative to the music
      shiftTextToLeft: 550, //starting point of text shift
      xCoordOfBird: 150, //initial position of the bird on the х axis 
      //changes in the moveCanvasAndTextToLeft 
      yCoordOfBird: 50, //initial position of the bird on the y axis
      //changes in the mooveBirdByVoice
      isCanvasHeightSet: 0,
      prevbirdFlyingHigh: undefined,
      isThisFirstTimePlaying: true
    };

    // //////////////////////// bind this for all methods where it is necessary
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
  //some magic for TypeScript, It will be overwritten
  canvasRefGetter = (canvasEl: HTMLCanvasElement) => { };
  canvasWrpRefGetter = (canvasWrpEl: HTMLElement) => { };
  songMP3RefGetter = (el: HTMLAudioElement) => { };
  textWrpRefGetter = (el: HTMLElement) => { };
  birdRefGetter = (el: HTMLElement) => { };
  soundExploisionRefGetter = (el: HTMLAudioElement) => { };
  soundOfFinishRefGetter = (el: HTMLAudioElement) => { };

  // ///////////////////////////////////////////////////////////////////////////
  // ////////
  componentDidMount() {
    //reloading the page when resizing the browser window
    window.addEventListener("resize", () => window.location.reload());

    //service function for creating routes
    //document.addEventListener("keyup", this.playPauseOnSpaseBtn);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // /////////
  componentDidUpdate(prevProps: SongPlayPageContainerPropsType) {
    // Setting the canvas height after getting DOM elements
    if (
      this.state.canvasRef?.clientHeight !== 0 &&
      this.state.isCanvasHeightSet === 0
    ) {
      this.setCanvasHeigthAndWidth(); //changing the canvas height by parent
    }

    if (this.state.canvasHeight !== 0 && this.state.isCanvasHeightSet === 1) {
      //Drawing the entire canvas field after setting its dimensions
      this.paintingCanvasField();
      //increasing the counter to exit recursion
      this.setState((state) => {
        return {
          isCanvasHeightSet: state.isCanvasHeightSet + 1,
        };
      });
    }
    // Click on the STOP button to return to the beginning
    if (
      this.props.isStopBtnPushed &&
      this.props.isStopBtnPushed !== prevProps.isStopBtnPushed
    ) {
      this.stopSigningAndMoving();
    }
    //pressing the start button to start a song.
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

  // ////////////////////////////////////////////////////////////////////
  // WORKING WITH MUSIC
  // ///////////////////////////////////////////////////////////////////
  // toggle isCurrentSongPlaing
  isCurrentSongPlayingSet(isCurrentSongPlaying: boolean) {
    this.props.isCurrentSongPlayingSetter(isCurrentSongPlaying);
  }

  // ////////////////////////////////////////////////////////////////////
  // Starting a background song
  playSongStart() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
// getting volume from props depending on input
    audio.volume = this.props.currentSongVolume; 
    audio.play();
    this.isCurrentSongPlayingSet(true);
  }

  // ///////////////////////////////////////////////////////////////////////
  // Start the sound of an explosion on impact
  playSoundExploisionStart() {
    const soundExploision = this.state.soundExploisionRef as HTMLAudioElement;
    soundExploision.play();
  }

  // ////////////////////////////////////////////////////////////////////
  // launch victory fanfare when passing through to the finish
  playSoundOfFinish() {
    const soundOfFinish = this.state.soundOfFinishRef;
    soundOfFinish?.play();
  }

  // //////////////////////////////////////////////////////////////////////
  // Stop the background song and send it back to the beginning
  playSongStop() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
    this.isCurrentSongPlayingSet(false);
  }

  // //////////////////////////////////////////////////////////////////////
  // Stop the background song at the current time
  playSongPause() {
    const audio = this.state.songMP3Ref as HTMLAudioElement;
    audio.pause();
    this.isCurrentSongPlayingSet(false);
  }

  // /////////////////////////////////////////////////////////////////////
  // Pause at the current location when pressing the "Space" keys 
  //(a service function without remove)

  playPauseOnSpaseBtn(event: any) {
    event.preventDefault();
    if (event.code === "Space" && this.props.isCurrentSongPlaying) {
      this.pauseSigningAndMoving();
    } else if (event.code === "Space" && !this.props.isCurrentSongPlaying) {
      this.startSigningAndMoving();
    }
  }

  // ////////////////////////////////////////////////////////////////////////////
  // changing the music volume
  changeVolumeOfSong(value: any) {
    this.props.setNewVolumeOfSong(value.target.value);
  }

  // ////////////////////////////////////////////////////////////////////////
  // changing the voice volume
  changeVolumeOfVoice(value: any) {
    this.props.setNewVolumeOfVoice(value.target.value);
  }

  // ////////////////////////////////////////////////////////////////////////////
  // bird movement depending on the sound from the microphone
  mooveBirdByVoice() {
    //creating an array for recording voice from a microphone
    this.setState({
      voiceArray: new Uint8Array(this.state.numOfItemsInVoiceArray),
    });

    //@ts-ignore
    let context = new (window.AudioContext || window.webkitAudioContext)(); //audiocontext WEB AudioAPI
    let analyser = context.createAnalyser();//create Analyser
    let gainNode = context.createGain(); //create gain Node
    

    this.setState({ analyser: analyser }); //passing data to a global variable for resetting

    //get the stream from the microphone and work with it
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let srcOfVoice = context.createMediaStreamSource(stream);
        srcOfVoice.connect(analyser); //transmitting audio to the analyzer
        analyser.connect(gainNode); //turning on the amplifier in front of the speakers
        gainNode.connect(context.destination); //output audio from the amplifier to the speakers
        //amplification/attenuation of the original sound
        // depending on the input via the state
        gainNode.gain.setValueAtTime(
          +this.props.currentVoiceVolume,
          context.currentTime
        );

        let birdFlyingFinish = '';

        // starting a bird flight with a delay !!!!!Here at the first launch an extra 0.4 seconds is taken from somewhere
        //made a crutch at row 868
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.moveBirdToUp(birdFlyingFinish);     
        

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
    const birdHeigth = birdOnCanvas?.clientHeight; //the height of the birds
    const canvasHeight = canvas?.clientHeight;
    // this is if you calibrate the microphone
    // const maxHeightForWhile = this.props.isSetMaxUserVoiceLevel
    //   ? this.props.maxUserVoiceLevel
    //   : 255;

    const loop = () => {
      this.state.voiceArray &&
        this.state.analyser.getByteFrequencyData(this.state.voiceArray); //obtaining data on the  voice signal frequencies


      // Getting the average sound value for all frequencies - 
      //this will be the current sound level value
      //sorting elements in the array in descending order
      let sortArray = this.state.voiceArray?.sort(function (a, b) {
        return b - a;
      }) as Uint8Array;

      //returns the average numOfItems value of the maximum elements in the array
      //(numOfItems changes on the settings page, depending on the sensitivity of the microphone)
      let takeAverageHeight = (numOfItems: number, sortArray: Uint8Array): number | undefined => {
        let averageHeight = 0;
        for (let i = 0; i < numOfItems; i++) {
          averageHeight += sortArray[i] / numOfItems
        }
        return averageHeight
      }

      let averageHeight = takeAverageHeight(this.props.sensibilityOfFly, sortArray) as number;

      let prevbirdFlyingHigh = this.state.prevbirdFlyingHigh ? this.state.prevbirdFlyingHigh : 0;

      //coefficient for the number of canvas pixels per height unit.(max- 255)
      let coefFromCanvasHeight = canvasHeight / 255;

      //the translation of the value of the height of birds to pixels
      let birdFlyingHigh = averageHeight * coefFromCanvasHeight;
      //shift of the bird relative to the bottom. birdMainWrp is equal to its height
      let marginTop = birdHeigth;
      
      // расчет calculation of the bird's height in px.
      // if the next value differs from the previous one by more than 2, then we reduce the difference to 0.2.
      //to remove big jumps
      if (
        //the bird rises sharply
        birdFlyingHigh - prevbirdFlyingHigh > 2 &&
        birdFlyingHigh - prevbirdFlyingHigh > 0 &&
        birdFlyingHigh >= marginTop
      ) {
        birdFlyingFinish = Math.round(prevbirdFlyingHigh) + 0.2 + "px";
      } else if (
        //the bird descends sharply
        Math.abs(birdFlyingHigh - prevbirdFlyingHigh) > 2 &&
        birdFlyingHigh - prevbirdFlyingHigh < 0 &&
        birdFlyingHigh >= marginTop
      ) {
        birdFlyingFinish = Math.round(prevbirdFlyingHigh) - 0.2 + "px";
      } else if (birdFlyingHigh >= marginTop) {
        //the bird flies smoothly
        birdFlyingFinish = birdFlyingHigh + "px";
      } else {
        //the bird at the bottom
        birdFlyingFinish = marginTop + "px";
      }

      //save the current value to the previous one for comparison in the next step
      this.setState({
        prevbirdFlyingHigh: birdFlyingHigh
      })

      //changing bottom - and fly. shift birds to a height of birdFlyingFinish))
      birdOnCanvas &&
        birdOnCanvas.setAttribute("style", `bottom: ${birdFlyingFinish}`);

      //current y coordinate of the bird center
      let currentYCoordinatOfBird = canvasHeight - (+birdFlyingFinish.slice(0, -2)) + birdHeigth / 2;

      //Updating the value of the bird's height in the local state
      this.setYCoordinateToState(currentYCoordinatOfBird);

      //Creating an array of coordinates of the bird at the moment
      this.createBirdCoordinatesArray(birdHeigth);

      // shift the field to the left by 2 px and update xCoordinates
      this.moveCanvasAndTextToLeft();
      
    }

    let flying = setInterval(loop, 1000 / playbackSpeed, birdFlyingFinish);
    this.setState({ flying: flying }); //passing data to a global variable for resetting
  };


  // /////////////////////////////////////////////////////////////////////
  // resetting the bird to its initial state
  stopBirdFlying() {
    const birdHeigth = this.state.birdRef?.clientHeight as number;
    this.state.birdRef?.setAttribute("style", "bottom:"+{birdHeigth}+"px");
    this.state.analyser?.disconnect();
    this.setState({ birdCoordinatesArray: [] });
  }

  // //////////////////////////////////////////////////////////////////////////
  //Creating an array of coordinates of the bird at the moment
  createBirdCoordinatesArray(birdHeigth: number) {
    let xCoordOfBird = this.state.xCoordOfBird; //position of the bird center by X
    let yCoordOfBird = this.state.yCoordOfBird; //position of the bird center by Y

    // function for transmitting the coordinates of a bird and the its radius
    this.saveBirdCoordinatesArray(xCoordOfBird, yCoordOfBird, birdHeigth / 2);
  }

  // ///////////////////////////////////////////////////////////////////////////
  // ////WORK WITH GRAPHICS
  // /////////////////////////////////////////////////////////////////////////////////
  // changing the canvas height
  setCanvasHeigthAndWidth() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const canvasWrp = this.state.canvasWrpRef;

    //setting the height of the tablet to 80 px less than the parent (80 for text)
    let canvasHeight = canvasWrp ? canvasWrp.clientHeight - 80 : 0;
    canvas && canvas.setAttribute("height", `${canvasHeight}px`);
    this.setState({
      canvasHeight: canvasHeight,
    });
    //increasing the counter to exit recursion in componentWillUpdate
    this.setState((state) => {
      return {
        isCanvasHeightSet: state.isCanvasHeightSet + 1,
      };
    });
  }

  // /////////////////////////////////////////////////////////////////////////
  // drawing a triangle
  paintTriangle(
    ctx: CanvasRenderingContext2D, //context
    x1: number, //initial x (by left)
    y1: number, //initial y (from up)
    x2: number, //x of vertexes
    y2: number, //y  of vertexes
    x3: number, //finish x (by right)
    fillColor = "rgba(135, 0, 250, 0.8)", //fill a shape
    strokeColor = "rgba(255, 29, 190, 0.8)" //the color of the outline
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    this.saveLineCoordinates(x1, y1, x2, y2); //save the lines coordinates into an array
    ctx.lineTo(x3, y1);
    this.saveLineCoordinates(x2, y2, x3, y1); //save the lines coordinates into an array
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //drawing of a trapezoid
  paintTrapeze(
    ctx: CanvasRenderingContext2D, //context
    x1: number, //initial x (by left)
    y1: number, //initial y (from buttom)
    x2: number, // shift from the beginning to the first upper face by X
    x3: number, // shift from the end to the second upper face by X
    x4: number, //finish x (by right)
    y2: number, //finish x (by up)
    fillColor = "rgba(135, 0, 250, 0.8)", //fill a shape
    strokeColor = "rgba(255, 29, 190, 0.8)" //the color of the outline
  ) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + x2, y2);
    this.saveLineCoordinates(x1, y1, x1 + x2, y2); //save the lines coordinates into an array
    ctx.lineTo(x4 - x3, y2);
    this.saveLineCoordinates(x1 + x2, y2, x4 - x3, y2); //save the lines coordinates into an array
    ctx.lineTo(x4, y1);
    this.saveLineCoordinates(x4 - x3, y2, x4, y1); //save the lines coordinates into an array
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //drawing a circle or arc
  paintCircle(
    ctx: CanvasRenderingContext2D, //context
    x: number, //x center of the circle
    y: number, // y center of the circle
    r: number, // radius
    startAngle = 0, // initial angle
    endAngle = 360, //finish angle
    anticlockwise = false, //if true then counterclockwise
    fillColor = "rgba(135, 0, 250, 0.8)", //fill a shape
    strokeColor = "rgba(255, 29, 190, 0.8)" //the color of the outline
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
  // drawing the entire canvas
  paintingCanvasField() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const canvasHeight = this.state.canvasHeight; //высота


    //getting the canvas context
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.setState({ ctx: ctx });

    //Creating an image object for the finish line
    let finishLineImg = new Image();

    // Binding the function to the onload event, 
    //Draw the finish ribbon when it is loaded with a width of 50 
    //and a canvas Height in the coordinates finishXCoord, 0
    finishLineImg.onload = () => {
      const finishXCoord = this.props.finishLineXCoordinate
      ctx?.drawImage(finishLineImg, finishXCoord, 0, 50, canvasHeight);
    };
    //Uploading an image file of the finishing tape
    finishLineImg.src = this.props.srcTofinishLineImg;

    //setting the number of options for the height of the obstacle
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

    //splitting heightValues into an array of keys and an array of values
    heightValues.forEach((item: any, i: number) => {
      let key = Object.keys(item);
      keys.push(key[0]); //names of height values to compare with the value in the state
      heightData.push(item[key[0]]); //height value in pixels
    });

    // ////////////////////////////////////////////////////////////////////
    //Automatic drawing of shapes based on data from the state
    this.props.currentSong.itemsOnCanvasCoordinates.map((item) => {
      let y1 = 0, y2 = 0; //variables for getting the height value

      // when the object key matches in the state and in heightValues
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === item.y1) {
          y1 = heightData[i];
        } else if (keys[i] === item.y2) {
          y2 = heightData[i];
        }
      }
      switch (item.type) {
        case "trapeze":
          //drawing trapezoids
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
          //drawing triangles
          return this.paintTriangle(ctx, item.x1, y1, item.x2, y2, item.x3);
        case "circle":
          // drawing circles
          return this.paintCircle(ctx, item.x, y1, item.r);
        default:
          return null;
      }
    });

    //calling a function that adds empty values to an array of obstacles, 
    //so that it has a value for each X
    //obstacles must not intersect at the X coordinate
    this.addZeroValuesInAllLinesCoordinatesArray();
  }

  // /////////////////////////////////////////////////////////////////// 
  // Creates an array of coordinates from points that make up the line that create the obstacle.
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
    //save the line coordinates every 1 px
    for (let x = A[0]; x <= B[0]; x += 1) {
      let y = Math.round(+(m * x + b));
      //adding an element to the array unless the previous element is at the same x coordinate
      if (this.state.allLinesCoordinatesArray.length === 0) {
        this.state.allLinesCoordinatesArray.push({ x: x, y: y })
      }
      else if (this.state.allLinesCoordinatesArray[this.state.allLinesCoordinatesArray.length - 1].x !== x) {
        this.state.allLinesCoordinatesArray.push({ x: x, y: y })
      }
    }
  }

  // /////////////////////////////////////////////////////////////////// 
  // Adding empty values to the array of coordinates from the points that make up the line 
  //that forms the obstacle, so that the element number in the alllinescoordinatesarray array corresponds to the x value.
  //(there should be no obstacles at the top and bottom at the same time )
// this reduces CPU usage by a multiple
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
  // array of coordinates of the circle that the bird currently occupies 
  //(5 points are enough)
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
  // comparing the overlap of the obstacle coordinates and any of the bird coordinates (and four adjacent points on the y axis)

  compareObstacleAndBirdCoordinates() {

    this.state.birdCoordinatesArray.forEach((currentBirdCoordinate) => {
      let i = currentBirdCoordinate.x
      if ((this.state.allLinesCoordinatesArray[i].x >= currentBirdCoordinate.x - 2 &&
        this.state.allLinesCoordinatesArray[i].x <= currentBirdCoordinate.x + 2
      ) &&
        (this.state.allLinesCoordinatesArray[i].y >= currentBirdCoordinate.y - 2 &&
          this.state.allLinesCoordinatesArray[i].y <= currentBirdCoordinate.y + 2)) {
        //COLLISION
        this.stopSigningAndMoving();
        this.playSoundExploisionStart();
        //console.log('COLLISION')     
      }
    })
  }

  // /////////////////////////////////////////////////////////////////////
  // moving the field to the left

  moveCanvasAndTextToLeft() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;
    const canvasWidth = canvas.clientWidth;


    //changing the value for the text and field shift at each step by 2 px
    this.setState((state) => ({
      shiftTextToLeft: state.shiftTextToLeft - 2,
    }));


    //start increasing the x coordinate of the bird relative to the beginning of the canvas
    //with the beginning of the field movement in increments of 2 px
    if (this.state.shiftTextToLeft <= 400) {
      // passing X of the new position of the bird to the state
      this.setXCoordinateToState(this.state.xCoordOfBird + 2);
    }

    // //we check whether the bird has encountered an obstacle
    this.compareObstacleAndBirdCoordinates();

    // This is a text shift at each step
    if (canvasWidth && Math.abs(this.state.shiftTextToLeft) < canvasWidth) {
      textWrp.setAttribute(
        "style",
        `margin-left: ${this.state.shiftTextToLeft}px`
      );
      // This is a field shift
// at each step after the text is aligned with the field
      if (this.state.shiftTextToLeft <= 400) {
        canvas.setAttribute(
          "style",
          `left: ${this.state.shiftTextToLeft - 400}px`
        );
      }
      // service function if you need to check the accuracy of the bird's position with its
// coordinates in the state
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


    //stop when you click STOP.
    if (this.props.isStopBtnPushed) {
      this.stopSigningAndMoving();
    }
    //stop at the end of the field when crossing the finish line.
    else if (
      Math.abs(this.state.xCoordOfBird) > this.props.finishLineXCoordinate
    ) {
      this.stopSigningAndMoving();
      this.playSoundOfFinish();
    }




  }

  ////////////////////////////////////resetting the settimeout timer-for field movement
  clearTimer() {
    clearInterval(this.state.flying);
    clearTimeout(this.state.moovingStartTimer);
    this.setState({
      moovingStartTimer: 0
    })
  }

  // ///////////////////////////////////////////////////////////////////////
  // AUDIO CONTROL AND RENDERING AT THE SAME TIME
  // //////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////
  // Stop playback and movement, return to the original state
  stopSigningAndMoving() {
    const canvas = this.state.canvasRef as HTMLCanvasElement;
    const textWrp = this.state.textWrpRef as HTMLElement;
    this.playSongStop();
    this.clearTimer();
    this.stopBirdFlying();
    canvas.setAttribute("style", "left: 20px"); //return the field to the beginning
    textWrp.setAttribute("style", `margin-left: 550px`); // return the text to the original position
    this.setState({
      shiftTextToLeft: 550,
    }); //resetting the text field shift counter
    this.setXCoordinateToState(150); //resetting the array of bird coordinates
    this.setYCoordinateToState(0); //resetting the array of bird coordinates
  }

  // //////////////////////////////////////////////////////////////////////
  // Stop playback and movement at the current moment
  pauseSigningAndMoving() {
    this.playSongPause();
    this.clearTimer();
  }

  // ////////////////////////////////////////////////////////////////////
  // Launch playing and moving the field
  startSigningAndMoving() {
    //start playing a song
    this.playSongStart();
    const delay = this.state.isThisFirstTimePlaying ? 
          (this.props.currentSong.startMovingDelay-0.4) * 1000 
          : (this.props.currentSong.startMovingDelay) * 1000;//delay in starting music playback, 0.4 seconds less for the first time
    // starting the bird lift depending on the voice level from the microphone
    // and start the movement of the field and text
    let moovingStartTimer = setTimeout(this.mooveBirdByVoice, delay);
    this.setState({
      moovingStartTimer: moovingStartTimer
    });
    //the next launch of the song will not be the first
    this.setState({
      isThisFirstTimePlaying: false
    });
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
